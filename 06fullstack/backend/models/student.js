const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true,
        unique: true,
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true,
        unique: true,
        minlength: [10, 'Email must be at least 10 characters long'],

    },
    mobile:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [10, 'Mobile number must be at least 10 characters long'],    
    },
    image:{
        type: String,
        required: true,
        trim: true,
    }  
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;