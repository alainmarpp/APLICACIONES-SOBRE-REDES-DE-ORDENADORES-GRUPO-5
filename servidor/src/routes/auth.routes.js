const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model');
const { verificarToken } = require('../middlewares/auth.middleware');

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_super_secreta_perruqueria";

// --- RUTA: REGISTRO SEGURO (Con hash de contraseña y tus logs) ---
router.post('/registro', async (req, res) => {
    console.log("📥 [SERVIDOR/Register] Petición POST recibida en /registro");
    console.log("📦 [SERVIDOR/Register] Datos que han llegado (req.body):", req.body);

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

        // OJO: la contraseña NO se hashea aquí. El modelo (user.model.js) ya la hashea
        // en el hook beforeCreate. Si se hasheara también aquí, quedaría hasheada dos veces
        // y el login (bcrypt.compare) fallaría siempre.
        const usuarioCreado = await Usuario.create({
            nombre: nombre,
            tlf: tlf,
            contrasenia: contrasenia
        });

        // Generar token para login automático tras el registro
        const token = jwt.sign(
            { nombre: usuarioCreado.nombre, tlf: usuarioCreado.tlf },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        console.log("✅ [SERVIDOR/Register] Usuario guardado y encriptado con éxito en Aiven.");
        
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

        const token = jwt.sign(
            { nombre: usuarioDB.nombre, tlf: usuarioDB.tlf },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

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