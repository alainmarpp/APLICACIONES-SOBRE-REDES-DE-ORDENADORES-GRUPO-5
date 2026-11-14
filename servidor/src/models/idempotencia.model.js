const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Idempotencia = sequelize.define('Idempotencia', {
    clave: { type: DataTypes.STRING(100), allowNull: false },
    usuario: { type: DataTypes.STRING(100), allowNull: false },
   
    huella: { type: DataTypes.STRING(64), allowNull: false },
    estado: { type: DataTypes.STRING(12), allowNull: false, defaultValue: 'procesando' },
    codigoRespuesta: { type: DataTypes.INTEGER },
    cuerpoRespuesta: { type: DataTypes.TEXT },
    creadaEn: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    tableName: 'idempotencia',
    timestamps: false,
    indexes: [{ unique: true, fields: ['clave', 'usuario'] }]
});

module.exports = Idempotencia;
