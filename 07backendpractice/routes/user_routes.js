const express = require('express');
const router = express.Router()
router.get('/',(req,res) => {
    res.render('index');
})

router.get('/home',(req,res) => {
    res.render('signup');
})

router.post('/formData',(req,res) => {
    // console.log(req.body);
    res.send(req.body)
});

router.get('/about',(req,res) => {
    res.send('This is about page');
})

module.exports = router;