const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
router.get('/', (req, res) => {
    res.render('home')
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.post('/formData',
    body('name').trim().isAlpha().isLength({ min: 3 }),
    body('email').trim().isEmail().isLength({ min: 10 }),
    body('phone').trim().isNumeric().isLength({ min: 10 }),
    body('password').trim().isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
                message: "Invalid Data"
            })
        }

        const { name, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword,
        });

        await newUser.save(); 

        res.json(newUser);
    })

module.exports = router;