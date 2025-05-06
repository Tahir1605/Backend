// creating a simple express server with multiple routes
// Importing the express module

const express = require('express');

const app = express();

const userModel = require('./models/user'); // importing the user model

const connection = require('./config/db'); // importing the database connection

app.use(express.static('public')); // serving static files from the public directory

app.set('view engine', 'ejs'); // setting the view engine to ejs

app.use(express.urlencoded({ extended: true })); // middleware to parse urlencoded data
app.use(express.json()); // middleware to parse json data



// route no. 1


app.get('/', (req, res) => {
  res.render('index');
});


// middleware example
// app.use((req, res, next) => {
//   console.log('Middleware executed!');
// next(); // calling the next middleware or route handler
// });
// route no. 2


app.get('/about', (req, res) => {
  res.send('About Page!');
});

// 1 Create

// user registration route starting from here

app.get('/register', (req, res) => {
  res.render('register'); // rendering the register page
});

app.post('/register', async (req, res) => {
  // console.log(req.body); // getting the data from the form

  const { name, email, password } = req.body; // destructuring the data from the form
  const newUser = await userModel.create(
    {
      username: name,
      email: email,
      password: password
    }) // creating a new user in the database
    res.send(newUser); // sending the response back to the client
  // res.send("User Registered"); // sending the response back to the client
  
});

// user registration route ends here


// 2 Read


// getting all users from the database

app.get('/users', async (req, res) => {
  userModel.find({username:"Tahir"}).then((users) => {
    res.send(users); // sending the users to the client
  })
});


// 3 Update

// updating a user in the database

app.get('/update', async(req,res)=>{
 await userModel.findOneAndUpdate({
    username:"Tahir"
  },{
    email:"t@gmail.com"
  })
  res.send("User Updated"); // sending the response back to the client
}
)


// 4 Delete
// deleting a user from the database

app.get('/delete', async(req,res)=>{
  await userModel.findOneAndDelete({
    username:"Pandu"
  })
  res.send("User Deleted"); // sending the response back to the client
})



// handling the post request from the register page

// getting data from the form using query parameters

// getting data from form using get method

// app.get('/getForm', (req,res)=>{
//   console.log(req.query); // query parameters
//   res.send("Data received");
// })


// getting data from form using post method


app.post('/getForm', (req, res) => {
  console.log(req.body); // body parameters
  res.send("Data received");
})


// route no. 3
app.get('/contact', (req, res) => {
  res.send('Contact Page!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});