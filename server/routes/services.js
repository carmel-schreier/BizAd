var express = require('express');
var router = express.Router();
const services = require('../controllers/services');


router.get('/', services.getServices);

module.exports = router;