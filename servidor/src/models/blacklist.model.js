const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const TokenInvalido = sequelize.define('TokenInvalido', {
    token: {
        type: DataTypes.STRING(500), // Los JWT son largos
        allowNull: false,
        unique: true
    }
});

module.exports = TokenInvalido;