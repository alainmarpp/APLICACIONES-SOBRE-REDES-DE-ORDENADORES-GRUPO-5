const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model');

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_super_secreta_perruqueria";

// --- RUTA: REGISTRO SEGURO ---
router.post('/registro', async (req, res) => {
    console.log("📥 [SERVIDOR/Register] Petición POST recibida en /registro");
    console.log("📦 [SERVIDOR/Register] Datos que han llegado (req.body):", req.body);

    const { nombre, tlf, contrasenia } = req.body;

    try {
        await Usuario.create({
            nombre: nombre,
            tlf: tlf,
            contrasenia: contrasenia 
        });

        console.log("✅ [SERVIDOR/Register] Usuario guardado con éxito en la base de datos de Aiven.");
        res.status(201).json({ mensaje: 'Usuario registrado correctamente de forma segura.' });
    } catch (error) {
        console.error("❌ [SERVIDOR] Error al registrar el usuario en la BBDD:", error);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario.' });
    }
});

// --- RUTA: LOGIN CON TOKENS ---
router.post('/login', async (req, res) => {
    const { nombre, contrasenia } = req.body;

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
            token: token 
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión.' });
    }
});

module.exports = router;