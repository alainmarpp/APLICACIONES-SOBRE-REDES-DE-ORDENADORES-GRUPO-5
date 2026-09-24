const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta básica para probar que la API responde
app.get('/', (req, res) => {
    res.json({
        mensaje: '¡API REST levantada y conectada a MySQL en la nube!'
    });
});

// Arrancar servidor
async function iniciarServidor() {
    try {
        // Comprobar conexión con Aiven
        await sequelize.authenticate();

        console.log('✅ Conexión con MySQL establecida correctamente.');

        // Sincronizar modelos con las tablas de la BBDD
        await sequelize.sync();

        console.log('✅ Modelos sincronizados correctamente.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:');
        console.error(error);
    }
}

iniciarServidor();