const mongoose = require('mongoose');


const connection = mongoose.connect(process.env.DB).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
}); // connecting to MongoDB

module.exports = connection; // exporting the connection