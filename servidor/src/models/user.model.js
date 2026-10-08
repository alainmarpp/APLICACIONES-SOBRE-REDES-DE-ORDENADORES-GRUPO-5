const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    tlf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasenia: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;