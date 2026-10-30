const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');

// Las credenciales NUNCA se escriben en el código: se leen del archivo servidor/.env,
// que no se sube a GitHub. Copia .env.example como .env y rellénalo.
const variablesNecesarias = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];
const faltan = variablesNecesarias.filter((variable) => !process.env[variable]);

if (faltan.length > 0) {
    throw new Error(
        `Faltan variables en servidor/.env: ${faltan.join(', ')}. Mira el archivo .env.example`
    );
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
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
