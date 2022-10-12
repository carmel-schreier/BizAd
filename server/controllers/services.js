const utility = require("../shared/utility");
const {
    Service
} = require('../models/services');
const {
    User
} = require('../models/User');
//const joi = require('joi');
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

    addToUser: async function (req, res, next) {
        let userEmail = utility.getUserEmail(req.header("x-auth-token"));
        try {
            const newService = new Service(req.body);
            const result = await User.findOne({
                email: userEmail
            }).updateOne({
                $push: {
                    services: newService
                }
            });
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).send('error adding service');
        }
    },
    getUserServices: async function (req, res, next) {
        let userEmail = utility.getUserEmail(req.header("x-auth-token"));
        try {
            const result = await User.findOne({
                email: userEmail
            });

            console.log(result)
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).send('error getting services');
        }
    },

    deleteUserService: async function (req, res, next) {
        let userEmail = utility.getUserEmail(req.header("x-auth-token"));
        console.log(req.body._id)
        try {
            await User.findOneAndUpdate({
                email: userEmail,
            }, {
                $pull: {
                    services: {
                        _id: req.body._id
                    }
                },
            })
            res.json({
                _id: req.body._id
            });
        } catch (err) {
            console.log(err);
            res.status(400).send('error deleting service');
        }
    }
}