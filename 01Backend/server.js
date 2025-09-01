import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import bcrypt from 'bcrypt'
import { validationResult , body } from 'express-validator'
import connection from './config/connection.js'
import User from './model/formModel.js'



dotenv.config()
const app = express()

// middlewares

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

// set view engine

app.set("view engine","ejs")

// database connection

connection()

const port = process.env.PORT || 5000

// multer setup code start


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/") // save inside public/uploads
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)) 
      // unique filename
    }
})
const upload = multer({ storage: storage })


// multer setup code end

// routes

app.get("/",(req,res) => {
    res.send("This is my first server")
})
app.get("/home",(req,res) => {
    res.render('home')
})

app.get("/form",(req,res) => {
    res.render('form')
})


// data insert code start 

app.post("/form", 

     upload.single("image"),

[
    body('name')
    .trim()
    .notEmpty().withMessage("Please enter name")
    .isLength({min:3}).withMessage("Name length must be 3")
    .isAlpha('en-US',{ignore:' '}).withMessage("Enter a valid name"),

    body('email')
    .trim()
    .notEmpty().withMessage("Please enter email")
    .isEmail().withMessage("Enter a valid email"),

    body('dob')
    .notEmpty().withMessage("Please enter date of birth")
    .isDate().withMessage('Enter valid date'),

    body('password')
    .trim()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),

],

async (req, res) => {

    try {

        const errors = validationResult(req);
        // console.log(errors.array()); this send the whole error array
        const errorMessage = errors.array().map(err => err.msg)
        // console.log(errorMessage);
        
        if (!errors.isEmpty()) {
            // console.log(req.body); 
            // it prints the data that user sent in form
            return res.json(
                {
                    errors: errorMessage,
                    message: 'Invalid data',
                }
            );
        }

        const { name, email, dob, password } = req.body

        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ 
                success:false, 
                message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const image = req.file ? `/uploads/${req.file.filename}` 
        : ""  // save relative path

        const newUser = new User({
            name,
            email,
            dob,
            password:hashedPassword,
            image
        })

        await newUser.save()

        res.json({ 
            success: true, 
            message: "User created successfully",
         })

    } catch (error) {
        console.log(error)
        res.json({ 
           success: false, 
           message: error.message || "Internal server error",
        })
    }
})

// data insert code end


// this data fetching code 


app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
});



// end of data fetching code 



// code of deleting data 


app.delete("/users/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

// end of deleting data code


// code for update data


// update user data
app.put("/users/update/:id", upload.single("image"),

 async (req, res) => {

  try {
    
    const { id } = req.params;
    const { name, email, dob, password } = req.body;

    // find the user
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (dob) user.dob = dob;

    // update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // update image if new file uploaded
    if (req.file) {
      user.image = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});



// end of upadate data code 



app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);   
})


