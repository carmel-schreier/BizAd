const {
    Ad
} = require('../models/ads');
//const joi = require('joi');
module.exports = {
    getAds: async function (req, res, next) {
        try {
            const result = await Ad.find();
            console.log("i'm in server")
            console.log(result)
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).send('error getting ads');
        }
    },
}