const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'nombre_de_tu_bd',
  process.env.DB_USER || 'tu_usuario_aiven',
  process.env.DB_PASSWORD || 'tu_password_aiven',
  {
    host: process.env.DB_HOST || 'tu-host-aiven.aivencloud.com',
    port: process.env.DB_PORT || 25060,
    dialect: 'mysql',
    dialectModule: require('mysql2'), 
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

module.exports = sequelize;