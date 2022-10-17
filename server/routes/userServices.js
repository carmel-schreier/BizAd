var express = require('express');
var router = express.Router();
const userServices = require('../controllers/userServices');

router.get('/', userServices.getServices);
router.post('/', userServices.addService);
router.put('/', userServices.deleteService);
router.patch('/:id', userServices.updateService);

module.exports = router;