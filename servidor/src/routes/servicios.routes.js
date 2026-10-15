const express = require('express');
const router = express.Router();
const { servicios } = require('../data/servicios');

// Lista de servicios con su duración (pantalla Servicios)
router.get('/servicios', (req, res) => {
    res.json(servicios);
});

module.exports = router;
