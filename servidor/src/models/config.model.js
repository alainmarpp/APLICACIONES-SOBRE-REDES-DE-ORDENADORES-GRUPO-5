const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Ajustes de la tienda guardados como clave/valor (de momento solo el horario).
const ConfigTienda = sequelize.define('ConfigTienda', {
    clave: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    valor: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'config_tienda',
    timestamps: false
});

module.exports = ConfigTienda;
