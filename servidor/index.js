const express = require('express');
const sequelize = require('./config/database');
const bcrypt = require('bcrypt'); // Lo necesitamos para el login (comparar)
const jwt = require('jsonwebtoken'); 
const Usuario = require('./models/Usuario'); // Ya importamos el modelo real

require('./src/models/user.model');
require('./src/models/animal.model');
require('./src/models/reserva.model');

const app = express();
const PORT = process.env.PORT || 3000;

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_super_secreta_perruqueria";

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: '¡API REST levantada y conectada a Aiven!'
    });
});

// --- RUTA: REGISTRO SEGURO ---
app.post('/registro', async (req, res) => {
    const { nombre, tlf, contrasenia } = req.body;

    try {
        await Usuario.create({
            nombre: nombre,
            tlf: tlf,
            contrasenia: contrasenia 
        });

        res.status(201).json({ mensaje: 'Usuario registrado correctamente de forma segura.' });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario.' });
    }
});

// --- RUTA: LOGIN CON TOKENS ---
app.post('/login', async (req, res) => {
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

// Arrancar servidor
async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión con Aiven establecida correctamente.');

        await sequelize.sync({ alter: true });
        console.log('✅ Tablas creadas/sincronizadas correctamente en la BBDD.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor o conectar a la BBDD:');
        console.error(error);
    }
}

iniciarServidor();