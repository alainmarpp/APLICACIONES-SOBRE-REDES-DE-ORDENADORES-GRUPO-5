require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const sequelize = require('./config/database');
const bcrypt = require('bcrypt');
const cors = require('cors');
const Usuario = require('./src/models/user.model');
const { generarToken, verificarToken } = require('./src/middlewares/auth.middleware');

require('./src/models/animal.model');
require('./src/models/reserva.model');

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;

app.use(cors()); // necesario para que la versión web de Expo pueda llamar a la API
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: '¡API REST levantada y conectada a Aiven!' });
});

// --- REGISTRO: hashea la contraseña y devuelve un token ---
app.post('/registro', async (req, res) => {
    const { nombre, tlf, contrasenia } = req.body;

    if (!nombre || !tlf || !contrasenia) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const existente = await Usuario.findByPk(nombre);
        if (existente) {
            return res.status(409).json({ error: 'Ese nombre de usuario ya existe' });
        }

        const hash = await bcrypt.hash(contrasenia, SALT_ROUNDS);
        const usuario = await Usuario.create({ nombre, tlf, contrasenia: hash });

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            token: generarToken(usuario),
            nombre: usuario.nombre,
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario.' });
    }
});

// --- LOGIN: compara hash y devuelve token ---
app.post('/login', async (req, res) => {
    const { nombre, contrasenia } = req.body;

    if (!nombre || !contrasenia) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
        const usuarioDB = await Usuario.findByPk(nombre);
        const valida = usuarioDB && (await bcrypt.compare(contrasenia, usuarioDB.contrasenia));

        if (!valida) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        res.json({
            mensaje: 'Login exitoso',
            token: generarToken(usuarioDB),
            nombre: usuarioDB.nombre,
        });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión.' });
    }
});

// --- RUTA PROTEGIDA: sirve también para validar el token al abrir la app ---
app.get('/perfil', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.nombre, { attributes: ['nombre', 'tlf'] });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        console.error('Error en /perfil:', error);
        res.status(500).json({ error: 'Error al obtener el perfil.' });
    }
});

// Ejemplo de cómo proteger el resto de rutas:
// app.get('/reservas', verificarToken, async (req, res) => { /* req.usuario.nombre */ });

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión con Aiven establecida correctamente.');
        await sequelize.sync({ alter: true });
        console.log('✅ Tablas sincronizadas correctamente.');
        app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
    } catch (error) {
        console.error('❌ Error al iniciar el servidor o conectar a la BBDD:', error);
    }
}

iniciarServidor();