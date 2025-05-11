require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const User = require('./models/user');
const Student = require('./models/student');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['POST'],
  credentials: true
}));

app.use(bodyParser.json());


const connectDB = require('./config/connection');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/signup',
  body('email').trim().isEmail(),
  body('username').trim().isLength({ min: 3 }),
  body('phone').trim().isLength({ min: 10 }),
  body('password').trim().isLength({ min: 6 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data',
      });
    }

    const { username, email, phone, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, email, phone, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  });

// Middleware to parse cookies
app.use(require('cookie-parser')());


app.post('/api/login',
  body('username').trim().isLength({ min: 3 }),
  body('password').trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: 'Invalid data',
      });
    }

    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: 'Username or password is incorrect' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Username or password is incorrect' });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );


      res.status(200).json({ token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  }

);


// Multer setup for file uploads

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });





app.post('/api/student-register', upload.single('image'),
  body('email').trim().isEmail(),
  body('name').trim().isLength({ min: 3 }),
  body('mobile').trim().isLength({ min: 10 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data',
      });
    }


    try {
      const { name, email, mobile } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!image) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: 'This Student is already exists' });
      }

      const newStudent = new Student({
        name,
        email,
        mobile,
        image // This will save just the filename
      });

      await newStudent.save();
      res.status(201).json({ message: 'Student registered successfully', student: newStudent });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering student', error });
    }
  });






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



