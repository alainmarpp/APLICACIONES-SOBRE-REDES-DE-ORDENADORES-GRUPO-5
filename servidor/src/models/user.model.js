const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt'); 

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
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  hooks: {
    
    beforeCreate: async (usuario) => {
      if (usuario.contrasenia) {
        const saltRounds = 10;
        usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, saltRounds);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('contrasenia')) {
        const saltRounds = 10;
        usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, saltRounds);
      }
    }
  }
});

module.exports = Usuario;