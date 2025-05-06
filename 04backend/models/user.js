const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    // age: Number,
    // gender:{
    //     type: String,
    //     enum:['male','female','other'],
    // }
}); // defining the schema for user

const userModel = mongoose.model('user', userSchema); // creating the model for user

module.exports = userModel; // exporting the model for user