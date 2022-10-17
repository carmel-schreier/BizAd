const {
    Ad
} = require('../models/ads');
//const joi = require('joi');
module.exports = {
    getAds: async function (req, res, next) {
        const query = req.query.q
        try {
            const result = await Ad.find({
                $regex: query
            });
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).send('error getting ads');
        }
    },
}