var express = require('express');
var router = express.Router();
const services = require('../controllers/services');


router.get('/', services.getServices);
router.get('/for-user', services.getUserServices);
router.post('/', services.addToUser);

module.exports = router;