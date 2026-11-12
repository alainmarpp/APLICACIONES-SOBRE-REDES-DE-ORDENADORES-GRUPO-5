const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Guarda, por usuario y por Idempotency-Key, el resultado de cada operación que modifica datos.
// Si la app reenvía la misma petición (porque se perdió la respuesta), se devuelve lo guardado
// en vez de ejecutarla otra vez. Está en la base de datos (no en memoria) para que
// sobreviva a reinicios del servidor y funcione aunque haya más de una instancia.
const Idempotencia = sequelize.define('Idempotencia', {
    clave: { type: DataTypes.STRING(100), allowNull: false },
    usuario: { type: DataTypes.STRING(100), allowNull: false },
    // Resumen de la petición (método + ruta + cuerpo): detecta si se reutiliza una clave con otra petición
    huella: { type: DataTypes.STRING(64), allowNull: false },
    estado: { type: DataTypes.STRING(12), allowNull: false, defaultValue: 'procesando' }, // 'procesando' | 'completada'
    codigoRespuesta: { type: DataTypes.INTEGER },
    cuerpoRespuesta: { type: DataTypes.TEXT },
    creadaEn: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    tableName: 'idempotencia',
    timestamps: false,
    indexes: [{ unique: true, fields: ['clave', 'usuario'] }]
});

module.exports = Idempotencia;
