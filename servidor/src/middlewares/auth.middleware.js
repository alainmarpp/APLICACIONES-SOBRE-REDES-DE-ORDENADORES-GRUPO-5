const jwt = require('jsonwebtoken');
const TokenInvalido = require('../models/blacklist.model');

const SECRET_KEY = process.env.SECRET_KEY || 'mi_clave_super_secreta_perruqueria';
const DURACION_TOKEN = process.env.TOKEN_DURACION || '15m';

function generarToken(usuario) {
    return jwt.sign({ nombre: usuario.nombre, tlf: usuario.tlf }, SECRET_KEY, { expiresIn: DURACION_TOKEN });
}

async function verificarToken(req, res, next) {
    const cabecera = req.headers['authorization'];
    const token = cabecera && cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const tokenRevocado = await TokenInvalido.findOne({ where: { token: token } });
        if (tokenRevocado) {
            return res.status(401).json({ error: 'La sesión fue cerrada. Inicia sesión de nuevo.' });
        }

        req.usuario = jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        const mensaje = error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';
        return res.status(401).json({ error: mensaje });
    }
}

module.exports = { generarToken, verificarToken };