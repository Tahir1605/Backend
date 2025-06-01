const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Database Connect Successfully");     
    }).catch((err) => {
        console.log("Database could not Connect",err.message);
        
    })
}
module.exports = connectDB;