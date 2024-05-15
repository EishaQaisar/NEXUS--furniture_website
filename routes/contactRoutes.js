const express= require('express');
const router= express.Router();

router.get('/', (req, res) => {
    res.render('contact');
});

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/shop', (req, res) => {
    res.render('shop');
});

router.get('/about', (req, res) => {
    res.render('about');
});

// router.get('/account', (req, res) => {
//     res.render('account');
// });



 

module.exports=router;