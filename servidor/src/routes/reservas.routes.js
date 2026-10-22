const express = require('express');
const router = express.Router();
const db = require('../services/db.service');
const { verificarToken } = require('../middlewares/auth.middleware');
const { servicios } = require('../data/servicios');
const { aMinutos, aHora, fechaDeHoy, calcularHoras } = require('../utils/disponibilidad');

const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

// Convierte "1,3" en los servicios correspondientes (ignora ids que no existan)
function buscarServicios(ids) {
    return ids
        .map((id) => servicios.find((s) => s.id === String(id)))
        .filter(Boolean);
}

// Horas libres de un día para unos servicios (pantalla Calendario)
// GET /disponibilidad?fecha=2026-10-15&servicios=1,3
router.get('/disponibilidad', verificarToken, async (req, res) => {
    const { fecha, servicios: idsTexto } = req.query;

    if (!fecha || !formatoFecha.test(fecha)) {
        return res.status(400).json({ error: 'Fecha no válida (usa AAAA-MM-DD)' });
    }

    const elegidos = buscarServicios(String(idsTexto || '').split(',').filter(Boolean));
    if (elegidos.length === 0) {
        return res.status(400).json({ error: 'Selecciona al menos un servicio' });
    }

    try {
        const duracion = elegidos.reduce((total, s) => total + s.duracion, 0);
        const reservas = await db.reservasDelDia(fecha);
        res.json({ duracion, horas: calcularHoras(fecha, duracion, reservas) });
    } catch (error) {
        console.error('Error al calcular disponibilidad:', error);
        res.status(500).json({ error: 'No se pudo consultar la disponibilidad' });
    }
});

// Mis reservas futuras
router.get('/reservas', verificarToken, async (req, res) => {
    try {
        const hoy = fechaDeHoy();
        res.json(await db.buscarReserva(req.usuario.nombre, hoy));
    } catch (error) {
        console.error('Error al listar reservas:', error);
        res.status(500).json({ error: 'No se pudieron cargar tus reservas' });
    }
});

// Crear reserva (pantalla Reserva)
// body: { idAnimal, fecha: "2026-10-15", horainicio: "10:00", servicios: ["1","3"] }
router.post('/reservas', verificarToken, async (req, res) => {
    const { idAnimal, fecha, horainicio, servicios: ids } = req.body;

    if (!idAnimal || !fecha || !formatoFecha.test(fecha) || !horainicio || !Array.isArray(ids)) {
        return res.status(400).json({ error: 'Faltan datos de la reserva' });
    }

    const elegidos = buscarServicios(ids);
    if (elegidos.length === 0 || elegidos.length !== ids.length) {
        return res.status(400).json({ error: 'Servicios no válidos' });
    }

    try {
        const animal = await db.obtenerAnimalDeUsuario(idAnimal, req.usuario.nombre);
        if (!animal) {
            return res.status(404).json({ error: 'Ese animal no es tuyo o no existe' });
        }

        // Se vuelve a comprobar aquí por si alguien ha cogido la hora mientras tanto
        const duracion = elegidos.reduce((total, s) => total + s.duracion, 0);
        const reservas = await db.reservasDelDia(fecha);
        const hora = calcularHoras(fecha, duracion, reservas).find((h) => h.hora === horainicio);

        if (!hora || !hora.libre) {
            return res.status(409).json({ error: 'Esa hora ya no está disponible' });
        }

        const horafin = aHora(aMinutos(horainicio) + duracion);
        const nombres = elegidos.map((s) => s.nombre).join(', ');

        // Comprueba el solape y guarda dentro de una transacción (devuelve null si ya está ocupada)
        const reserva = await db.crearReservaSiLibre(animal.id, req.usuario.nombre, fecha, horainicio, horafin, nombres);
        if (!reserva) {
            return res.status(409).json({ error: 'Esa hora ya no está disponible' });
        }
        res.status(201).json(reserva);
    } catch (error) {
        // Dos reservas a la vez sobre la misma hora: MySQL aborta una con deadlock
        const codigo = error.parent?.code || error.original?.code || error.code;
        if (codigo === 'ER_LOCK_DEADLOCK') {
            return res.status(409).json({ error: 'Esa hora ya no está disponible' });
        }
        console.error('Error al crear reserva:', error);
        res.status(500).json({ error: 'No se pudo crear la reserva' });
    }
});

router.delete('/reservas/:id', verificarToken, async (req, res) => {
    try {
        const borradas = await db.eliminarReservaDeUsuario(req.params.id, req.usuario.nombre);

        if (borradas === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada o no te pertenece' });
        }
        
        res.json({ mensaje: 'Reserva cancelada' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo cancelar la reserva' });
    }
});

module.exports = router;