const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/user_routes')
const PORT = process.env.PORT || 4000;


const connectDB = require('./config/connection');
connectDB();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(userRouter);
app.set('view engine','ejs');


app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);    
})