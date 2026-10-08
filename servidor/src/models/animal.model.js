const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./user.model');

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreAnimal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.DECIMAL(5, 2)
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'nombre'
        }
    }
}, {
    tableName: 'animales',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['nombreAnimal', 'raza', 'usuario'] // Evita duplicados para un mismo usuario
        }
    ]
});

// Relación: Un usuario tiene muchos animales
Usuario.hasMany(Animal, { foreignKey: 'usuario', sourceKey: 'nombre' });
Animal.belongsTo(Usuario, { foreignKey: 'usuario', targetKey: 'nombre' });

module.exports = Animal;