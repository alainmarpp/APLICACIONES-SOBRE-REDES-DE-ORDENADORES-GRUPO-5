// servidor/config/database.js
// Lee la configuración del .env (cargado en index.js con dotenv).
//  - DB_DIALECT=sqlite  -> base local en un archivo (solo para pruebas, sin instalar nada)
//  - por defecto        -> MySQL (Aiven o local)
const { Sequelize } = require('sequelize');
const path = require('path');

let sequelize;

if (process.env.DB_DIALECT === 'sqlite') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'dev.sqlite'),
        logging: false,
    });
} else {
    const mysql2 = require('mysql2');
    const fs = require('fs');
    const usarSSL = process.env.DB_SSL === 'true'; // true para Aiven

    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || '127.0.0.1',
            port: Number(process.env.DB_PORT) || 3306,
            dialect: 'mysql',
            dialectModule: mysql2,
            logging: false,
            dialectOptions: {
                connectTimeout: 20000,
                ...(usarSSL && {
                    ssl: {
                        ca: fs.readFileSync(path.join(__dirname, '..', 'ca.pem')),
                        rejectUnauthorized: true,
                    },
                }),
            },
        }
    );
}

module.exports = sequelize;