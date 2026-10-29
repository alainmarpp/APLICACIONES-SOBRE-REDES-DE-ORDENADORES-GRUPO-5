require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const middlewareIdempotencia = require('./src/middlewares/idempotencia'); 

require('./src/models/user.model');
require('./src/models/animal.model');
require('./src/models/reserva.model');
require('./src/models/blacklist.model'); 
require('./src/models/resena.model');    

const authRoutes = require('./src/routes/auth.routes');
const serviciosRoutes = require('./src/routes/servicios.routes');
const animalesRoutes = require('./src/routes/animales.routes');
const reservasRoutes = require('./src/routes/reservas.routes');
const resenasRoutes = require('./src/routes/resenas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

app.use(middlewareIdempotencia);

app.get('/', (req, res) => {
    res.json({ mensaje: '¡API REST levantada y conectada a Aiven!' });
});

app.use(authRoutes);
app.use(serviciosRoutes);
app.use(animalesRoutes);
app.use(reservasRoutes);
app.use(resenasRoutes);

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