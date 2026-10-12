const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); 
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
  'defaultdb',
  'avnadmin',
  'AVNS_CBWJqqqfHar_tglwnhu',
  {
    host: 'miapp-miapp.b.aivencloud.com',
    port: 27199,
    dialect: 'mysql',
    dialectModule: mysql2, 
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, '..', 'ca.pem')),
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

module.exports = sequelize;