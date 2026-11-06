const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const Usuario = require('../models/user.model');
const Animal = require('../models/animal.model');
const Reserva = require('../models/reserva.model');
const Resena = require('../models/resena.model');
const sequelize = require('../../config/database');
const { verificarToken } = require('../middlewares/auth.middleware');
const idempotencia = require('../middlewares/idempotencia');
const { fechaDeHoy } = require('../utils/disponibilidad');
const { leerHorario, validarBloques, guardarHorario } = require('../services/horario.service');

const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

// Solo deja pasar a usuarios con rol "peluquero". El rol se mira en la BBDD en cada petición
// (no en el token), así que quitar el rol a alguien surte efecto al momento.
async function soloPeluquero(req, res, next) {
    try {
        const usuario = await Usuario.findByPk(req.usuario.nombre, { attributes: ['rol'] });
        if (!usuario || usuario.rol !== 'peluquero') {
            return res.status(403).json({ error: 'Esta sección es solo para el peluquero.' });
        }
        next();
    } catch (error) {
        console.error('Error al comprobar el rol:', error);
        res.status(500).json({ error: 'No se pudo comprobar tu perfil.' });
    }
}

// Horario fijo de la tienda. Es público: lo ven los clientes en la app.
router.get('/horario', async (req, res) => {
    res.json(await leerHorario());
});

// El peluquero cambia el horario. body: { bloques: [{ inicio: "09:00", fin: "13:00" }, ...] }
router.put('/horario', verificarToken, soloPeluquero, idempotencia, async (req, res) => {
    const resultado = validarBloques(req.body?.bloques);
    if (resultado.error) return res.status(400).json({ error: resultado.error });

    try {
        res.json(await guardarHorario(resultado.bloques));
    } catch (error) {
        console.error('Error al guardar el horario:', error);
        res.status(500).json({ error: 'No se pudo guardar el horario.' });
    }
});

// Agenda de un día (por defecto, hoy). GET /peluquero/agenda?fecha=2026-11-12
router.get('/peluquero/agenda', verificarToken, soloPeluquero, async (req, res) => {
    const fecha = req.query.fecha || fechaDeHoy();
    if (!formatoFecha.test(fecha)) {
        return res.status(400).json({ error: 'Fecha no válida (usa AAAA-MM-DD).' });
    }

    try {
        const reservas = await Reserva.findAll({
            where: { fecha },
            include: [
                { model: Animal, attributes: ['nombreAnimal', 'raza', 'edad', 'peso'] },
                { model: Usuario, attributes: ['nombre', 'tlf'] }
            ],
            order: [['horainicio', 'ASC']]
        });

        const citas = reservas.map((r) => ({
            id: r.id,
            fecha: r.fecha,
            horainicio: String(r.horainicio).slice(0, 5),
            horafin: String(r.horafin).slice(0, 5),
            servicio: r.servicio,
            perro: r.Animal
                ? { nombre: r.Animal.nombreAnimal, raza: r.Animal.raza, edad: r.Animal.edad, peso: r.Animal.peso }
                : null,
            cliente: r.Usuario ? { nombre: r.Usuario.nombre, tlf: r.Usuario.tlf } : { nombre: r.usuario, tlf: '' }
        }));

        // Si ese día no hay citas, se indica cuál es el siguiente día que sí tiene (para que no parezca que falla)
        let proxima = null;
        if (citas.length === 0) {
            const siguiente = await Reserva.findOne({
                where: { fecha: { [Op.gt]: fecha } },
                attributes: ['fecha'],
                order: [['fecha', 'ASC']],
                raw: true
            });
            if (siguiente) proxima = String(siguiente.fecha).slice(0, 10);
        }

        res.json({ fecha, total: citas.length, citas, proxima });
    } catch (error) {
        console.error('Error al cargar la agenda:', error);
        res.status(500).json({ error: 'No se pudo cargar la agenda.' });
    }
});

// El peluquero cancela la cita de cualquier cliente.
router.delete('/peluquero/reservas/:id', verificarToken, soloPeluquero, idempotencia, async (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).json({ error: 'Identificador de reserva no válido.' });
    }

    try {
        const borradas = await Reserva.destroy({ where: { id: req.params.id } });
        if (!borradas) return res.status(404).json({ error: 'Esa cita ya no existe.' });
        res.json({ mensaje: 'Cita cancelada.' });
    } catch (error) {
        console.error('Error al cancelar la cita:', error);
        res.status(500).json({ error: 'No se pudo cancelar la cita.' });
    }
});

// ---------- Usuarios ----------

// Lista de usuarios (sin contraseñas), con cuántos perros y reservas tiene cada uno.
router.get('/peluquero/usuarios', verificarToken, soloPeluquero, async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ attributes: ['nombre', 'tlf', 'rol'], order: [['nombre', 'ASC']], raw: true });
        const animales = await Animal.findAll({ attributes: ['usuario'], raw: true });
        const reservas = await Reserva.findAll({ attributes: ['usuario'], raw: true });

        const contar = (filas) => filas.reduce((mapa, f) => ({ ...mapa, [f.usuario]: (mapa[f.usuario] || 0) + 1 }), {});
        const porAnimales = contar(animales);
        const porReservas = contar(reservas);

        res.json(
            usuarios.map((u) => ({
                nombre: u.nombre,
                tlf: u.tlf,
                rol: u.rol,
                animales: porAnimales[u.nombre] || 0,
                reservas: porReservas[u.nombre] || 0
            }))
        );
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({ error: 'No se pudieron cargar los usuarios.' });
    }
});

// "Contratar" = dar el rol de peluquero; también se puede volver a cliente. body: { rol: "peluquero" | "cliente" }
router.put('/peluquero/usuarios/:nombre/rol', verificarToken, soloPeluquero, idempotencia, async (req, res) => {
    const rol = req.body?.rol;
    if (!['peluquero', 'cliente'].includes(rol)) {
        return res.status(400).json({ error: 'El rol debe ser "peluquero" o "cliente".' });
    }
    if (req.params.nombre === req.usuario.nombre) {
        return res.status(400).json({ error: 'No puedes cambiar tu propio rol.' });
    }

    try {
        const usuario = await Usuario.findByPk(req.params.nombre);
        if (!usuario) return res.status(404).json({ error: 'Ese usuario no existe.' });

        usuario.rol = rol;
        await usuario.save();
        res.json({ nombre: usuario.nombre, rol: usuario.rol });
    } catch (error) {
        console.error('Error al cambiar el rol:', error);
        res.status(500).json({ error: 'No se pudo cambiar el rol.' });
    }
});

// Elimina un usuario y todo lo suyo (perros, reservas y reseñas).
router.delete('/peluquero/usuarios/:nombre', verificarToken, soloPeluquero, idempotencia, async (req, res) => {
    const nombre = req.params.nombre;
    if (nombre === req.usuario.nombre) {
        return res.status(400).json({ error: 'No puedes eliminarte a ti mismo.' });
    }

    try {
        const usuario = await Usuario.findByPk(nombre);
        if (!usuario) return res.status(404).json({ error: 'Ese usuario ya no existe.' });
        if (usuario.rol === 'peluquero') {
            return res.status(400).json({ error: 'Es peluquero: primero quítale el rol y luego podrás eliminarlo.' });
        }

        await sequelize.transaction(async (t) => {
            await Reserva.destroy({ where: { usuario: nombre }, transaction: t });
            await Resena.destroy({ where: { usuario: nombre }, transaction: t });
            await Animal.destroy({ where: { usuario: nombre }, transaction: t });
            await Usuario.destroy({ where: { nombre }, transaction: t });
        });

        res.json({ mensaje: 'Usuario eliminado.' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'No se pudo eliminar el usuario.' });
    }
});

module.exports = router;
