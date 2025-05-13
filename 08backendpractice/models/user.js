const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [3, 'minimum length should be 3 of name']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [10, 'minimum length should be 10 of email']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [10, 'minimum length should be 10 of mobile number']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [6, 'minmum length should be 6 of password']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;