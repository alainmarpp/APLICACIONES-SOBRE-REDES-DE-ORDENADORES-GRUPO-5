const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

require('./src/models/user.model');
require('./src/models/animal.model');
require('./src/models/reserva.model');

const authRoutes = require('./src/routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: '¡API REST levantada y conectada a Aiven!' });
});

app.use(authRoutes);

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