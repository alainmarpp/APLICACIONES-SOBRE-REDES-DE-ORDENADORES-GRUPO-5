const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const TokenInvalido = require('../models/blacklist.model');
const sequelize = require('../../config/database');
const { verificarToken, generarToken } = require('../middlewares/auth.middleware');

router.post('/registro', async (req, res) => {
    const { nombre, tlf, contrasenia } = req.body;

    if (!nombre || !tlf || !contrasenia) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (typeof nombre !== 'string' || typeof contrasenia !== 'string') {
        return res.status(400).json({ error: 'Formato de datos inválido.' });
    }

    if (nombre.trim().length < 6 || nombre.trim().length > 20) {
        return res.status(400).json({
            error: 'El nombre debe tener entre 6 y 20 caracteres.'
        });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/;

    if (!passwordRegex.test(contrasenia)) {
        return res.status(400).json({
            error: 'La contraseña debe tener al menos 7 caracteres, incluir una mayúscula, una minúscula y un símbolo.'
        });
    }

    try {
        const existente = await Usuario.findOne({ where: { nombre } });

        if (existente) {
            return res.status(409).json({ error: 'Ese nombre de usuario ya existe' });
        }

        const usuarioCreado = await Usuario.create({
            nombre: nombre,
            tlf: tlf,
            contrasenia: contrasenia
        });

        const token = generarToken(usuarioCreado);

        console.log("Usuario guardado y encriptado con éxito.");

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente de forma segura.',
            token: token,
            nombre: usuarioCreado.nombre
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario.' });
    }
});

router.post('/login', async (req, res) => {
    const { nombre, contrasenia } = req.body;

    if (!nombre || !contrasenia) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const usuarioDB = await Usuario.findOne({ where: { nombre: nombre } });

        if (!usuarioDB) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const contrasenaValida = await bcrypt.compare(
            contrasenia,
            usuarioDB.contrasenia
        );

        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const token = generarToken(usuarioDB);

        res.json({
            mensaje: 'Login exitoso',
            token: token,
            nombre: usuarioDB.nombre,
            rol: usuarioDB.rol
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión.' });
    }
});

router.get('/perfil', verificarToken, async (req, res) => {
    try {
<<<<<<< HEAD
        const usuarioDB = await Usuario.findByPk(req.usuario.nombre, { attributes: ['nombre', 'tlf', 'rol'] });
=======
        const usuarioDB = await Usuario.findByPk(
            req.usuario.nombre,
            { attributes: ['nombre', 'tlf'] }
        );
>>>>>>> main

        if (!usuarioDB) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

<<<<<<< HEAD
        res.json({ nombre: usuarioDB.nombre, tlf: usuarioDB.tlf, rol: usuarioDB.rol });
=======
        res.json({
            nombre: usuarioDB.nombre,
            tlf: usuarioDB.tlf
        });
>>>>>>> main
    } catch (error) {
        console.error("Error en /perfil:", error);
        res.status(500).json({ error: 'No se pudo cargar el perfil.' });
    }
});

router.put('/perfil', verificarToken, async (req, res) => {
    const { tlf } = req.body;

    if (typeof tlf !== 'string' || !tlf.trim()) {
        return res.status(400).json({ error: 'Introduce un teléfono válido.' });
    }

    if (tlf.trim().length < 6 || tlf.trim().length > 20) {
        return res.status(400).json({
            error: 'El teléfono debe tener entre 6 y 20 caracteres.'
        });
    }

    try {
        const [actualizados] = await Usuario.update(
            { tlf: tlf.trim() },
            { where: { nombre: req.usuario.nombre } }
        );

        if (!actualizados) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        res.json({
            mensaje: 'Teléfono actualizado correctamente.',
            tlf: tlf.trim()
        });
    } catch (error) {
        console.error('Error al actualizar el teléfono:', error);
        res.status(500).json({
            error: 'No se pudo actualizar el teléfono.'
        });
    }
});

router.delete('/perfil', verificarToken, async (req, res) => {
    const cabecera = req.headers.authorization;
    const token = cabecera?.startsWith('Bearer ')
        ? cabecera.slice(7)
        : null;

    try {
        await sequelize.transaction(async (t) => {
            if (token) {
                await TokenInvalido.create(
                    { token },
                    { transaction: t }
                );
            }

            const eliminado = await Usuario.destroy({
                where: { nombre: req.usuario.nombre },
                transaction: t
            });

            if (!eliminado) {
                throw new Error('USUARIO_NO_ENCONTRADO');
            }
        });

        res.json({
            mensaje: 'La cuenta se ha eliminado correctamente.'
        });
    } catch (error) {
        if (error.message === 'USUARIO_NO_ENCONTRADO') {
            return res.status(404).json({ error: 'No se encontró el usuario.' });
        }

        console.error('Error al eliminar la cuenta:', error);

        res.status(409).json({
            error: 'No se pudo eliminar la cuenta. Puede que tenga animales o reservas asociados.'
        });
    }
});

router.post('/logout', verificarToken, async (req, res) => {
    const cabecera = req.headers['authorization'];
    const token = cabecera.slice(7);

    try {
        await TokenInvalido.create({ token });

        res.json({
            mensaje: 'Sesión cerrada y token invalidado en el servidor.'
        });
    } catch (error) {
        console.error("Error al invalidar token:", error);
        res.status(500).json({
            error: 'Error al cerrar sesión en el servidor.'
        });
    }
});

module.exports = router;