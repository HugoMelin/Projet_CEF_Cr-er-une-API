var express = require('express');
var router = express.Router();

const service = require('../services/booking');

router.get('/:id/reservations', service.getAll);

router.get('/:id/reservations/:idReservation', service.getById);

router.post('/:id/reservations', service.add);

router.patch('/:id/reservations/:idReservation', service.update);

router.delete('/:id/reservations/:idReservation', service.delete);

module.exports = router;