const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const TokenInvalido = sequelize.define('TokenInvalido', {
    token: {
        type: DataTypes.STRING(500), 
        allowNull: false,
        unique: true
    }
});

module.exports = TokenInvalido;