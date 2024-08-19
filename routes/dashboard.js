var express = require('express');
var router = express.Router();

const service = require('../services/dashboard');

const private = require('../middlewares/private');

router.get('/', private.checkJWT, service.dashboard);

router.post('/updateUser', private.checkJWT, service.updateUser);

router.post('/updateUser/:id', private.checkJWT, service.updateUserById);

router.get('/deleteUser/', private.checkJWT, service.deleteUser);

router.get('/updateCatway/:id', private.checkJWT, service.updateCatway);

router.post('/updateCatway/:id', private.checkJWT, service.updateCatwayById);

router.get('/deleteCatway/:id', private.checkJWT, service.deleteCatway)

module.exports = router;
