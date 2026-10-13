require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

require('./src/models/user.model');
require('./src/models/animal.model');
require('./src/models/reserva.model');

const authRoutes = require('./src/routes/auth.routes');
const serviciosRoutes = require('./src/routes/servicios.routes');
const animalesRoutes = require('./src/routes/animales.routes');
const reservasRoutes = require('./src/routes/reservas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); 
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ mensaje: '¡API REST levantada y conectada a Aiven!' });
});

app.use(authRoutes);      // POST /registro, POST /login, GET /perfil
app.use(serviciosRoutes); // GET /servicios
app.use(animalesRoutes);  // GET/POST /animales, PUT/DELETE /animales/:id   (con token)
app.use(reservasRoutes);  // GET /disponibilidad, GET/POST /reservas, DELETE /reservas/:id (con token)


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