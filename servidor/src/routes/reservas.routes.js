const express = require('express');
const router = express.Router();

const db = require('../services/db.service');
const { verificarToken } = require('../middlewares/auth.middleware');
const idempotencia = require('../middlewares/idempotencia');
const { obtenerHorario } = require('../services/horario.service');
const { servicios } = require('../data/servicios');
const {
    aMinutos,
    aHora,
    fechaDeHoy,
    calcularHoras
} = require('../utils/disponibilidad');

const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

function buscarServicios(ids) {
    return ids
        .map((id) => servicios.find((s) => s.id === String(id)))
        .filter(Boolean);
}

router.get('/disponibilidad', verificarToken, async (req, res) => {
    const {
        fecha,
        servicios: idsTexto,
        excluirReserva
    } = req.query;

    if (!fecha || !formatoFecha.test(fecha)) {
        return res.status(400).json({
            error: 'Fecha no válida (usa AAAA-MM-DD)'
        });
    }

    const elegidos = buscarServicios(
        String(idsTexto || '').split(',').filter(Boolean)
    );

    if (elegidos.length === 0) {
        return res.status(400).json({
            error: 'Selecciona al menos un servicio'
        });
    }

    try {
        const duracion = elegidos.reduce(
            (total, servicio) => total + servicio.duracion,
            0
        );

        let reservas = await db.reservasDelDia(fecha);

        if (excluirReserva) {
            if (!/^\d+$/.test(String(excluirReserva))) {
                return res.status(400).json({
                    error: 'Identificador de reserva no válido'
                });
            }

            const reservaPropia = await db.reservaDeUsuario(
                excluirReserva,
                req.usuario.nombre
            );

            if (!reservaPropia) {
                return res.status(404).json({
                    error: 'Reserva no encontrada o no te pertenece'
                });
            }

            reservas = reservas.filter(
                (reserva) =>
                    Number(reserva.id) !== Number(excluirReserva)
            );
        }

        return res.json({
            duracion,
            horas: calcularHoras(fecha, duracion, reservas, await obtenerHorario())
        });
    } catch (error) {
        console.error('Error al calcular disponibilidad:', error);

        return res.status(500).json({
            error: 'No se pudo consultar la disponibilidad'
        });
    }
});

router.get('/reservas', verificarToken, async (req, res) => {
    try {
        const hoy = fechaDeHoy();

        const reservas = await db.buscarReserva(
            req.usuario.nombre,
            hoy
        );

        return res.json(reservas);
    } catch (error) {
        console.error('Error al listar reservas:', error);

        return res.status(500).json({
            error: 'No se pudieron cargar tus reservas'
        });
    }
});

router.post('/reservas', verificarToken, idempotencia, async (req, res) => {
    const {
        idAnimal,
        fecha,
        horainicio,
        servicios: ids
    } = req.body;

    if (
        !idAnimal ||
        !fecha ||
        !formatoFecha.test(fecha) ||
        !horainicio ||
        !Array.isArray(ids)
    ) {
        return res.status(400).json({
            error: 'Faltan datos de la reserva'
        });
    }

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(horainicio)) {
        return res.status(400).json({
            error: 'La hora no es válida'
        });
    }

    const elegidos = buscarServicios(ids);

    if (elegidos.length === 0 || elegidos.length !== ids.length) {
        return res.status(400).json({
            error: 'Servicios no válidos'
        });
    }

    try {
        const animal = await db.obtenerAnimalDeUsuario(
            idAnimal,
            req.usuario.nombre
        );

        if (!animal) {
            return res.status(404).json({
                error: 'Ese animal no es tuyo o no existe'
            });
        }

        const duracion = elegidos.reduce(
            (total, servicio) => total + servicio.duracion,
            0
        );

        const reservas = await db.reservasDelDia(fecha);

        const hora = calcularHoras(fecha, duracion, reservas, await obtenerHorario()).find((elemento) => elemento.hora === horainicio);

        if (!hora || !hora.libre) {
            return res.status(409).json({
                error: 'Esa hora ya no está disponible'
            });
        }

        const horafin = aHora(aMinutos(horainicio) + duracion);
        const nombres = elegidos
            .map((servicio) => servicio.nombre)
            .join(', ');

        const reserva = await db.crearReservaSiLibre(
            animal.id,
            req.usuario.nombre,
            fecha,
            horainicio,
            horafin,
            nombres
        );

        if (!reserva) {
            return res.status(409).json({
                error: 'Esa hora ya no está disponible'
            });
        }

        return res.status(201).json(reserva);
    } catch (error) {
        const codigo =
            error.parent?.code ||
            error.original?.code ||
            error.code;

        if (codigo === 'ER_LOCK_DEADLOCK') {
            return res.status(409).json({
                error: 'Esa hora ya no está disponible'
            });
        }

        console.error('Error al crear reserva:', error);

        return res.status(500).json({
            error: 'No se pudo crear la reserva'
        });
    }
});

router.delete('/reservas/:id', verificarToken, idempotencia, async (req, res) => {
    try {
        const borradas = await db.eliminarReservaDeUsuario(
            req.params.id,
            req.usuario.nombre
        );

        if (borradas === 0) {
            return res.status(404).json({
                error: 'Reserva no encontrada o no te pertenece'
            });
        }

        return res.json({
            mensaje: 'Reserva cancelada'
        });
    } catch (error) {
        console.error('Error al cancelar reserva:', error);

        return res.status(500).json({
            error: 'No se pudo cancelar la reserva'
        });
    }
});

router.put('/reservas/:id', verificarToken, idempotencia, async (req, res) => {
    const {
        fecha,
        horainicio,
        servicios: ids
    } = req.body;

    if (
        !fecha ||
        !formatoFecha.test(fecha) ||
        !horainicio ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(horainicio) ||
        !Array.isArray(ids) ||
        ids.length === 0
    ) {
        return res.status(400).json({
            error: 'Los datos de la reserva no son válidos'
        });
    }

    const elegidos = buscarServicios(ids);

    if (elegidos.length !== ids.length) {
        return res.status(400).json({
            error: 'Servicios no válidos'
        });
    }

    try {
        const reserva = await db.reservaDeUsuario(
            req.params.id,
            req.usuario.nombre
        );

        if (!reserva) {
            return res.status(404).json({
                error: 'Reserva no encontrada o no te pertenece'
            });
        }

        if (fecha < fechaDeHoy()) {
            return res.status(400).json({
                error: 'No puedes elegir una fecha pasada'
            });
        }

        const duracion = elegidos.reduce(
            (total, servicio) => total + servicio.duracion,
            0
        );

        const reservas = await db.reservasDelDia(fecha);

        const otrasReservas = reservas.filter(
            (elemento) => Number(elemento.id) !== Number(req.params.id)
        );

        const horas = calcularHoras(fecha, duracion, otrasReservas, await obtenerHorario());

        const hora = horas.find(
            (elemento) => elemento.hora === horainicio
        );

        if (!hora || !hora.libre) {
            return res.status(409).json({
                error: 'Esa hora ya no está disponible'
            });
        }

        const horafin = aHora(aMinutos(horainicio) + duracion);

        const nombresServicios = elegidos
            .map((servicio) => servicio.nombre)
            .join(', ');

        const resultado = await db.modificarReservaDeUsuario(
            req.params.id,
            req.usuario.nombre,
            {
                fecha,
                horainicio,
                horafin,
                servicio: nombresServicios
            }
        );

        if (resultado[0] === 0) {
            return res.status(404).json({
                error: 'No se pudo encontrar la reserva para modificar'
            });
        }

        return res.json({
            mensaje: 'Reserva modificada correctamente'
        });
    } catch (error) {
        console.error('Error al modificar reserva:', error);

        return res.status(500).json({
            error: 'No se pudo modificar la reserva'
        });
    }
});

module.exports = router;
