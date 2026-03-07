const express = require('express');
const reservacionController = require('../controllers/reservacionController.js');
const router = express.Router();
// Rutas para reservaciones
router.get('/', reservacionController.getAllReservaciones);
router.get('/:id', reservacionController.getReservacionById);
router.post('/', reservacionController.createReservacion);
router.put('/:id', reservacionController.updateReservacion);
router.delete('/:id', reservacionController.deleteReservacion);
module.exports = router;