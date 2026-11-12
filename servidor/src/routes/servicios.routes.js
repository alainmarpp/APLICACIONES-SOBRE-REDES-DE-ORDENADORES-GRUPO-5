const express = require('express');
const router = express.Router();
const { servicios } = require('../data/servicios');

router.get('/servicios', (req, res) => {
    res.json(servicios);
});

// Comprobación de que el servidor está vivo (la usan la app y los servicios de hosting).
// No toca la base de datos: responde siempre rápido.
router.get('/salud', (req, res) => {
    res.json({ ok: true });
});

module.exports = router;
