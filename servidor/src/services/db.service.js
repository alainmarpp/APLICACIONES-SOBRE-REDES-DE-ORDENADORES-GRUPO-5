const Usuario = require('../models/user.model');
const Animal = require('../models/animal.model');
const Reserva = require('../models/reserva.model');
const { Op } = require('sequelize');

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

async function crearReserva(idAnimal, usuario, fecha, horainicio, horafin, servicio) {
    return await Reserva.create({ idAnimal, usuario, fecha, horainicio, horafin, servicio });
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
        include: [Animal] // Trae también la información del animal asociado si lo necesitas
    });
}

async function eliminarReserva(idReserva) {
    return await Reserva.destroy({ where: { id: idReserva } });
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
    crearReserva,
    buscarReserva,
    eliminarReserva
};