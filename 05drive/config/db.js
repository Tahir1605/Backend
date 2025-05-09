const mongoose = require('mongoose');
function connectDB() { 
    mongoose.connect(process.env.MONGO_URI).then(() =>{
        console.log('Connected to MongoDB');
    })
       
}

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose. It exports a function that, when called, establishes the connection and logs a message to the console indicating success.