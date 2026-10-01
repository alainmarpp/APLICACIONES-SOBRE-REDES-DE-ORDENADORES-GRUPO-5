
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function testConnection() {
    console.log('Iniciando conexión con Aiven MySQL...');

    const connection = await mysql.createConnection({
        host: 'miapp-miapp.b.aivencloud.com',
        port: 27199,
        user: 'avnadmin',
        password: 'AVNS_CBWJqqqfHar_tglwnhu',
        database: 'defaultdb',
        family: 4,

        ssl: {
            ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
            rejectUnauthorized: true
        },

        connectTimeout: 20000
    });

    console.log('✅ Conexión directa con MySQL correcta');

    // Prueba adicional: comprobar que podemos hacer una consulta
    const [rows] = await connection.query('SELECT 1 AS test');

    console.log('✅ Consulta SQL correcta:', rows);

    await connection.end();

    console.log('🔌 Conexión cerrada');
}

testConnection().catch(error => {
    console.error('❌ Error MySQL:');
    console.error('Código:', error.code);
    console.error('Mensaje:', error.message);
});
