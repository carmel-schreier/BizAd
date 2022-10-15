const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    services: [{
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: false,
        },
    }]

});

const User = mongoose.model('User', userSchema);

exports.User = User;