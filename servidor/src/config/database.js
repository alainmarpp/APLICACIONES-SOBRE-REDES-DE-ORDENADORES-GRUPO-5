const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'defaultdb',
    process.env.DB_USER || 'avnadmin',
    process.env.DB_PASSWORD || 'AVNS_CBWJqqqfHar_tglwnhu',
    {
        host: process.env.DB_HOST || 'miapp-miapp.b.aivencloud.com',
        port: Number(process.env.DB_PORT) || 27199,
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: false,
        dialectOptions: {
            connectTimeout: 20000,
            ssl: {
                ca: fs.readFileSync(path.join(__dirname, '..', 'ca.pem')),
                rejectUnauthorized: false,
            },
        },
    }
);

module.exports = sequelize;