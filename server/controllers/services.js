const {
    Service
} = require('../models/services');
//const joi = require('joi');
module.exports = {
    getServices: async function (req, res, next) {
        console.log("i'm in server")
        try {
            const result = await Service.find();

            console.log(result)
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).send('error getting services');
        }
    },
}