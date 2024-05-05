const express= require('express');
const router= express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/account', (req, res) => {
    res.render('account');
});

router.get('/shop', (req, res) => {
    res.render('shop');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/about', (req, res) => {
    res.render('about');
});
// router.get('/resetPassword', (req, res) => {
//     res.render('resetPassword');
// });
 

 

module.exports=router;