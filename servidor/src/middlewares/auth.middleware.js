const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'mi_clave_super_secreta_perruqueria';
if (!process.env.SECRET_KEY) {
    console.warn('⚠️  SECRET_KEY no definida en el entorno: usando clave de desarrollo.');
}

function generarToken(usuario) {
    return jwt.sign({ nombre: usuario.nombre }, SECRET_KEY, { expiresIn: '2h' });
}

// Middleware: exige cabecera "Authorization: Bearer <token>"
function verificarToken(req, res, next) {
    const cabecera = req.headers['authorization'];
    const token = cabecera && cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        req.usuario = jwt.verify(token, SECRET_KEY); // { nombre, iat, exp }
        next();
    } catch (error) {
        const mensaje = error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';
        return res.status(401).json({ error: mensaje });
    }
}

module.exports = { generarToken, verificarToken };