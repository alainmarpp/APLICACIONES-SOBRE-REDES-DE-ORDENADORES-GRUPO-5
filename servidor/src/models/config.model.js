const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

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
