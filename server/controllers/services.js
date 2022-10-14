const {
    Service
} = require('../models/services');
module.exports = {
    getServices: async function (req, res, next) {
        try {
            const result = await Service.find();
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).send('error getting services');
        }
    },


}