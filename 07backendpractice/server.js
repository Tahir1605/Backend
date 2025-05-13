//  Step -> 1 Create a Server

// const express = require('express');
// const app = express()
// PORT = '3000'

// app.get('/',(req,res) => {
//     res.send("Hello World")
// })

// app.listen(PORT,() => {
//     console.log(`Server running at http://localhost:${PORT}`);
    
// })


// Step -> 2 Creating server with multiple routes

// const express = require('express');
// const app = express()
// const PORT = '3000';

// app.get('/',(req,res) => {
//    res.send("This is Home Page")
    
// })

// app.get('/about',(req,res) => {
//     res.send("This is about Page")
// })

// app.get('/contact',(req,res) => {
//     res.send("This is contact Page")
// })


// app.listen(PORT,() => {
//     console.log(`Server running at http://localhost:${PORT}`);   
// })


// Step -> 3 creating View Engine and render pages


// const express = require('express');
// const app = express()
// const PORT = '3000';

// app.set('view engine' , 'ejs');

// app.get('/',(req,res) => {
//     res.send("Hello world");
// })

// app.get('/home',(req,res) => {
//     res.render('index');
// })

// app.listen(PORT,()=>{
//     console.log(`Server is running at http://localhost:${PORT}`);
    
// })


// Step -> 4   Creating an reliable code 
// Step -> 4.1 creating .env file and write port there 
// Step -> 4.2 creating .gitignore file and write .env file and node modules files
// step -> 4.3 creating another folder where we create routes and use them in main backend file (server.js)


const express = require('express');
const app = express();
const userRouter = require('./routes/user_routes');
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs');
app.use(userRouter); 
app.listen(PORT,()=>{
    console.log(`Server Running at http://localhost:${PORT}`);
})
