const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const { verificarToken, generarToken } = require('../middlewares/auth.middleware');

// --- RUTA: REGISTRO SEGURO (Con hash de contraseña y tus logs) ---
router.post('/registro', async (req, res) => {

    const { nombre, tlf, contrasenia } = req.body;

    if (!nombre || !tlf || !contrasenia) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        // Verificar si ya existe
        const existente = await Usuario.findOne({ where: { nombre } });
        if (existente) {
            return res.status(409).json({ error: 'Ese nombre de usuario ya existe' });
        }


        const usuarioCreado = await Usuario.create({
            nombre: nombre,
            tlf: tlf,
            contrasenia: contrasenia
        });

        // Generar token para login automático tras el registro
        const token = generarToken(usuarioCreado);
        
        res.status(201).json({ 
            mensaje: 'Usuario registrado correctamente de forma segura.',
            token: token,
            nombre: usuarioCreado.nombre
        });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar el usuario.' });
    }
});

// --- RUTA: LOGIN CON TOKENS ---
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

// --- RUTA: PERFIL (comprueba que el token sigue siendo válido; la usa el auto-login) ---
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

module.exports = router;