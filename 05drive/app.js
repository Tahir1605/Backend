const express = require('express');
const userRouter = require('./routes/user_routes');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
dotenv.config();

const indexRouter = require('./routes/index_routes');



const connectToDB = require('./config/db');
connectToDB();




app.use(cookieParser());
app.use('/', indexRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/user', userRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// This is a simple Express server that listens on port 3000 and responds with "Hello World!" when accessed at the root URL.