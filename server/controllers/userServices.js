const {
    User
} = require('../models/User');
const {
    Service
} = require('../models/services');
const joi = require('joi');
const utility = require("../shared/utility");

module.exports = {
    getServices: async function (req, res, next) {
        let userEmail = utility.getUserEmail(req.header("x-auth-token"));
        try {
            const result = await User.findOne({
                email: userEmail
            });
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(400).send('error getting services');
        }
    },

    addService: async function (req, res, next) {
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


    deleteService: async function (req, res, next) {
        let userEmail = utility.getUserEmail(req.header("x-auth-token"));
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
    },

    updateService: async function (req, res, next) {
        let userEmail = utility.getUserEmail(req.header("x-auth-token"));
        let updatedService = req.body;

        try {
            await User.findOneAndUpdate({
                email: userEmail,
                services: {
                    $elemMatch: {
                        _id: req.params.id
                    }
                }
            }, {
                $set: {
                    'services.$.status': updatedService.status,
                    'services.$.comment': updatedService.comment
                }
            }, {
                'new': true,
                'safe': true,
                'upsert': true
            });
            res.json({
                _id: req.body._id
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('error updating service');
        }
    }
}