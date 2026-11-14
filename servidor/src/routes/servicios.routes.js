const express = require('express');
const router = express.Router();
const { servicios } = require('../data/servicios');

router.get('/servicios', (req, res) => {
    res.json(servicios);
});

router.get('/salud', (req, res) => {
    res.json({ ok: true });
});

module.exports = router;
