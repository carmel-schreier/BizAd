const {
    User
} = require('../models/User');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/dev');
const utility = require("../shared/utility");

module.exports = {
    login: async function (req, res, next) {

        const schema = joi.object({
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024),
        });

        const {
            error,
            value
        } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            return res.status(400).send({
                error: error.details[0].message
            });
        }

        try {
            const user = await User.findOne({
                email: value.email
            });
            if (!user) return res.status(401).send({
                error: 'Unauthorized'
            });
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) return res.status(401).send({
                error: 'Unauthorized'
            });

            const param = {
                email: value.email
            };
            const token = jwt.sign(param, config.jwt_secret, {
                expiresIn: '72800s'
            });

            res.json({
                token: token,
                id: user._id,
                email: user.email,
                name: user.name,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong. Please try again later');
        }
    },

    signup: async function (req, res, next) {
        const schema = joi.object({
            name: joi.string().required().min(2).max(256),
            email: joi.string().min(6).max(255).required().email(),
            password: joi.string().min(6).max(1024).required(),
        });

        const {
            error,
            value
        } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).send({
                error: error.details[0].message
            });
            return;
        }

        try {
            const user = await User.findOne({
                email: value.email
            });
            if (user) {
                return res.status(400).send({
                    error: 'Problem registering new user'
                });
            }

            const hash = await bcrypt.hash(value.password, 10);

            const newUser = new User({
                name: value.name,
                email: value.email,
                password: hash,
            });

            await newUser.save();

            res.json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            })
        } catch (err) {
            console.log(err.message);
            res.status(500).send({
                error: 'Something went wrong, please try again later'
            });
        }
    },

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
    }
}