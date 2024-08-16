var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwayRoute = require('../routes/catways');
const bookingRoute = require('../routes/booking');

router.use('/users', userRoute);
router.use('/catways', catwayRoute);
router.use('/catways', bookingRoute);

module.exports = router;
