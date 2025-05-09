const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/user_models');
const jwt = require('jsonwebtoken');


router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),
    async (req, res) => {

        const errors = validationResult(req);
        // console.log(errors);
        if (!errors.isEmpty()) {
            // console.log(req.body);
            // res.send('invalid data');
            return res.status(422).json(
                {
                    errors: errors.array(),
                    message: 'Invalid data',
                }
            );
        }

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await newUser.save(); // ✅ Save to MongoDB

        res.json(newUser);

    })

router.get('/login', (req, res) => {
    res.render('login');
})


router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(
                {
                    errors: errors.array(),
                    message: 'Invalid data',
                }
            );
        }

        const { username, password } = req.body;
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
        );

        res.cookie('token', token);
        res.send('Logged in successfully');
    })

module.exports = router;