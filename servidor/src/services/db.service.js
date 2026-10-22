const Usuario = require('../models/user.model');
const Animal = require('../models/animal.model');
const Reserva = require('../models/reserva.model');
const { Op } = require('sequelize');
const sequelize = require('../../config/database');

async function registrarUsuario(nombre, tlf, contrasenia) {
    return await Usuario.create({ nombre, tlf, contrasenia });
}

async function obtenerUsuario(nombreUsuario) {
    return await Usuario.findByPk(nombreUsuario); 
}

async function obtenerTelefono(nombreUsuario) {
    const usuario = await Usuario.findByPk(nombreUsuario, { attributes: ['tlf'] });
    return usuario ? usuario.tlf : null;
}

async function modificarContrasenia(nombreUsuario, nuevaContrasenia) {
    return await Usuario.update(
        { contrasenia: nuevaContrasenia },
        { where: { nombre: nombreUsuario } }
    );
}

async function eliminarUsuario(nombreUsuario) {
    return await Usuario.destroy({ where: { nombre: nombreUsuario } });
}

async function crearAnimal(nombreAnimal, edad, peso, raza, usuario) {
    return await Animal.create({ nombreAnimal, edad, peso, raza, usuario });
}

async function modificarAnimal(nombreAnimal, raza, usuario, nuevosDatos) {
    return await Animal.update(nuevosDatos, {
        where: { nombreAnimal, raza, usuario }
    });
}

async function eliminarAnimal(nombreAnimal, raza, usuario) {
    return await Animal.destroy({
        where: { nombreAnimal, raza, usuario }
    });
}

// --- Nuevas: lo que necesita la API para las pantallas ---

async function listarAnimales(usuario) {
    return await Animal.findAll({ where: { usuario } });
}

// Busca un animal por id comprobando que es de ese usuario
async function obtenerAnimalDeUsuario(id, usuario) {
    return await Animal.findOne({ where: { id, usuario } });
}

async function modificarAnimalPorId(id, usuario, nuevosDatos) {
    return await Animal.update(nuevosDatos, { where: { id, usuario } });
}

async function eliminarAnimalPorId(id, usuario) {
    return await Animal.destroy({ where: { id, usuario } });
}

async function crearReserva(idAnimal, usuario, fecha, horainicio, horafin, servicio) {
    return await Reserva.create({ idAnimal, usuario, fecha, horainicio, horafin, servicio });
}

// Crea la reserva solo si no choca con otra del mismo día. Devuelve null si la hora ya está ocupada.
// Va dentro de una transacción con bloqueo para que dos personas que pulsan a la vez
// no puedan coger la misma hora.
async function crearReservaSiLibre(idAnimal, usuario, fecha, horainicio, horafin, servicio) {
    return await sequelize.transaction(async (t) => {
        const choque = await Reserva.findOne({
            where: {
                fecha,
                horainicio: { [Op.lt]: horafin },
                horafin: { [Op.gt]: horainicio }
            },
            transaction: t,
            lock: t.LOCK.UPDATE
        });
        if (choque) return null;

        return await Reserva.create(
            { idAnimal, usuario, fecha, horainicio, horafin, servicio },
            { transaction: t }
        );
    });
}

async function buscarReserva(usuario, fechaActual) {
    // Busca reservas del usuario a partir de una fecha dada
    return await Reserva.findAll({
        where: {
            usuario: usuario,
            fecha: {
                [Op.gte]: fechaActual // Op.gte significa "Greater than or equal" (>=)
            }
        },
        include: [Animal], // Trae también la información del animal asociado
        order: [['fecha', 'ASC'], ['horainicio', 'ASC']]
    });
}

async function reservaDeUsuario(idReserva, usuario) {
    return await Reserva.findOne({
        where: {
            id: idReserva,
            usuario
        }
    });
}

// Todas las reservas de un día (de cualquier usuario), para calcular huecos libres
async function reservasDelDia(fecha) {
    return await Reserva.findAll({ where: { fecha } });
}

async function eliminarReserva(idReserva) {
    return await Reserva.destroy({ where: { id: idReserva } });
}

// Igual que eliminarReserva pero solo si la reserva es de ese usuario
async function eliminarReservaDeUsuario(idReserva, usuario) {
    return await Reserva.destroy({ where: { id: idReserva, usuario } });
}

async function modificarReservaDeUsuario(idReserva, usuario, nuevosDatos) {
    return await Reserva.update(nuevosDatos, {
        where: {
            id: idReserva,
            usuario
        }
    });
}

module.exports = {
    registrarUsuario,
    obtenerUsuario,
    obtenerTelefono,
    modificarContrasenia,
    eliminarUsuario,
    crearAnimal,
    modificarAnimal,
    eliminarAnimal,
    listarAnimales,
    obtenerAnimalDeUsuario,
    modificarAnimalPorId,
    eliminarAnimalPorId,
    crearReserva,
    crearReservaSiLibre,
    buscarReserva,
    reservaDeUsuario,
    reservasDelDia,
    eliminarReserva,
    eliminarReservaDeUsuario,
    modificarReservaDeUsuario
};