const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        require: true,
    },
    adNumber: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },


});

const Ad = mongoose.model('Ad', adSchema);

exports.Ad = Ad;