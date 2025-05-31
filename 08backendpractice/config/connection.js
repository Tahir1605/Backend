const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://5566tahirul:cNkUvwxqE0WqxMnd@test.dxadbnb.mongodb.net/TahirDB?retryWrites=true&w=majority&appName=Test').then(() => {
        console.log("Database Connect Successfully");     
    }).catch((err) => {
        console.log("Database could not Connect",err.message);
        
    })
}
module.exports = connectDB;