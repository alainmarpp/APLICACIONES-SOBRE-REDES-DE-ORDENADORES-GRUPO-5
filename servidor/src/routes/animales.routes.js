const express = require('express');
const router = express.Router();
const db = require('../services/db.service');
const { verificarToken } = require('../middlewares/auth.middleware');
const idempotencia = require('../middlewares/idempotencia');

// Mis animales (pantalla Reserva: elegir perro)
router.get('/animales', verificarToken, async (req, res) => {
    try {
        res.json(await db.listarAnimales(req.usuario.nombre));
    } catch (error) {
        console.error('Error al listar animales:', error);
        res.status(500).json({ error: 'No se pudieron cargar tus animales' });
    }
});

// Registrar perro (pantalla RegistroPerro)
router.post('/registrarAnimal', verificarToken, idempotencia, async (req, res) => {
    const { nombreAnimal, edad, peso, raza } = req.body;

    if (!nombreAnimal || !nombreAnimal.trim() || !raza || !raza.trim()) {
        return res.status(400).json({ error: 'El nombre y la raza son obligatorios' });
    }

    const edadNum = edad === undefined || edad === '' ? null : Number(edad);
    const pesoNum = peso === undefined || peso === '' ? null : Number(peso);
    if ((edadNum !== null && Number.isNaN(edadNum)) || (pesoNum !== null && Number.isNaN(pesoNum))) {
        return res.status(400).json({ error: 'La edad y el peso deben ser números' });
    }

    try {
        const animal = await db.crearAnimal(nombreAnimal.trim(), edadNum, pesoNum, raza.trim(), req.usuario.nombre);
        res.status(201).json(animal);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Ya tienes un animal con ese nombre y raza' });
        }
        console.error('Error al crear animal:', error);
        res.status(500).json({ error: 'No se pudo registrar el animal' });
    }
});

router.put('/animales/:id', verificarToken, idempotencia, async (req, res) => {
    const { nombreAnimal, edad, peso, raza } = req.body;
    const nuevosDatos = {};
    if (nombreAnimal !== undefined) nuevosDatos.nombreAnimal = nombreAnimal;
    if (edad !== undefined) nuevosDatos.edad = edad;
    if (peso !== undefined) nuevosDatos.peso = peso;
    if (raza !== undefined) nuevosDatos.raza = raza;

    try {
        const [filas] = await db.modificarAnimalPorId(req.params.id, req.usuario.nombre, nuevosDatos);
        if (filas === 0) return res.status(404).json({ error: 'Animal no encontrado' });
        res.json({ mensaje: 'Animal actualizado' });
    } catch (error) {
        console.error('Error al modificar animal:', error);
        res.status(500).json({ error: 'No se pudo modificar el animal' });
    }
});

router.delete('/animales/:id', verificarToken, idempotencia, async (req, res) => {
    try {
        const borrados = await db.eliminarAnimalPorId(req.params.id, req.usuario.nombre);
        if (borrados === 0) return res.status(404).json({ error: 'Animal no encontrado' });
        res.json({ mensaje: 'Animal eliminado' });
    } catch (error) {
        console.error('Error al eliminar animal:', error);
        res.status(500).json({ error: 'No se pudo eliminar el animal' });
    }
});

module.exports = router;
