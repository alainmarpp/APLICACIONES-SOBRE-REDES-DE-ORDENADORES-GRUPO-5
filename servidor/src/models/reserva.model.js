const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./user.model');
const Animal = require('./animal.model');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horainicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horafin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    servicio: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'reservas',
    timestamps: false
});

// Relaciones
Usuario.hasMany(Reserva, { foreignKey: 'usuario', sourceKey: 'nombre' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario', targetKey: 'nombre' });

Animal.hasMany(Reserva, { foreignKey: 'idAnimal' });
Reserva.belongsTo(Animal, { foreignKey: 'idAnimal' });

module.exports = Reserva;