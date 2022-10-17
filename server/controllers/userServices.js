const {
    User
} = require('../models/User');
const {
    Service
} = require('../models/services');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/dev');
const utility = require("../shared/utility");

module.exports = {
    getServices: async function (req, res, next) {
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
    },

    updateService: async function (req, res, next) {
        let userEmail = utility.getUserEmail(req.header("x-auth-token"));
        try {
            await User.findOneAndUpdate({
                email: userEmail,
            }, {
                $patch: {
                    services: {
                        _id: req.params._id
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