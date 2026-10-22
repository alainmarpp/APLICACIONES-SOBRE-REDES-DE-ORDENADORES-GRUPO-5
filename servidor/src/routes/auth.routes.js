const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const TokenInvalido = require('../models/blacklist.model');
const { verificarToken, generarToken } = require('../middlewares/auth.middleware');

router.post('/registro', async (req, res) => {
    console.log("📥 [SERVIDOR/Register] Petición POST recibida en /registro");
    console.log("📦 [SERVIDOR/Register] Datos que han llegado (req.body):", req.body);

    const { nombre, tlf, contrasenia } = req.body;

    if (!nombre || !tlf || !contrasenia) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
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

        console.log("✅ [SERVIDOR/Register] Usuario guardado y encriptado con éxito.");
        
        res.status(201).json({ 
            mensaje: 'Usuario registrado correctamente de forma segura.',
            token: token,
            nombre: usuarioCreado.nombre
        });
    } catch (error) {
        console.error("❌ [SERVIDOR] Error al registrar el usuario en la BBDD:", error);
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

        const contrasenaValida = await bcrypt.compare(contrasenia, usuarioDB.contrasenia);

        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        const token = generarToken(usuarioDB);

        res.json({ 
            mensaje: 'Login exitoso', 
            token: token,
            nombre: usuarioDB.nombre
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión.' });
    }
});

router.get('/perfil', verificarToken, async (req, res) => {
    try {
        const usuarioDB = await Usuario.findByPk(req.usuario.nombre, { attributes: ['nombre', 'tlf'] });

        if (!usuarioDB) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        res.json({ nombre: usuarioDB.nombre, tlf: usuarioDB.tlf });
    } catch (error) {
        console.error("Error en /perfil:", error);
        res.status(500).json({ error: 'No se pudo cargar el perfil.' });
    }
});

router.post('/logout', verificarToken, async (req, res) => {
    const cabecera = req.headers['authorization'];
    const token = cabecera.slice(7); 

    try {
        await TokenInvalido.create({ token: token });
        res.json({ mensaje: 'Sesión cerrada y token invalidado en el servidor.' });
    } catch (error) {
        console.error("Error al invalidar token:", error);
        res.status(500).json({ error: 'Error al cerrar sesión en el servidor.' });
    }
});

module.exports = router;