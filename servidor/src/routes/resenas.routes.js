const express = require('express');
const router = express.Router();
const Resena = require('../models/resena.model');
const Usuario = require('../models/user.model');
const { verificarToken, generarToken } = require('../middlewares/auth.middleware');

router.get('/resenas', async (req, res) => {
    try {
        const resenas = await Resena.findAll({
            include: [{ model: Usuario, attributes: ['nombre'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(resenas);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron cargar las reseñas' });
    }
});

router.post('/resenas', verificarToken, async (req, res) => {
    try {
        const { puntuacion, comentario } = req.body;
        const usuario = req.usuario.nombre;

        if (!puntuacion || !comentario) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nuevaResena = await Resena.create({
            puntuacion,
            comentario,
            usuario
        });

        res.status(201).json({ mensaje: 'Reseña publicada con éxito', resena: nuevaResena });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo publicar la reseña' });
    }
});

module.exports = resenaRoutes = router;