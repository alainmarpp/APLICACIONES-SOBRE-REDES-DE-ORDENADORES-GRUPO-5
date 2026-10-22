const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./user.model');

const Resena = sequelize.define('Resena', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'resenas',
    timestamps: true 
});

Usuario.hasMany(Resena, { foreignKey: 'usuario', sourceKey: 'nombre' });
Resena.belongsTo(Usuario, { foreignKey: 'usuario', targetKey: 'nombre' });

module.exports = Resena;