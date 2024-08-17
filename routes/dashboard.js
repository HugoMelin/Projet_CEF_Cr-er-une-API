var express = require('express');
var router = express.Router();

const service = require('../services/dashboard');

const private = require('../middlewares/private');

router.get('/', private.checkJWT, service.dashboard)

module.exports = router;
