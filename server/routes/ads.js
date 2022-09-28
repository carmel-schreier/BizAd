var express = require('express');
var router = express.Router();
const ads = require('../controllers/ads');


router.get('/', ads.getAds);

module.exports = router;