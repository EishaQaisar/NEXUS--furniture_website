const express= require('express');
const router= express.Router();
const session =require("express-session")
const config1=require('../src/config1')
const auth=require('../middleware/auth')
const userController = require('../controller/userController');
const Comment = require('../model/comment');

router.use(session({secret:config1.sessionSecret}));


router.get('/', (req, res) => {
    res.render('index');
});



// router.get('/account', (req, res) => {
//     res.render('account');
// });
//  router.get('/account', auth.isLogin, (req,res) =>{

//     res.render('account')
//  } );
router.get('/account', auth.isLogin, userController.loadAccount );



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
router.post('/products/comments', userController.addComment);
router.post('/wishlist/add',  auth.isLoggedIn, userController.addToWishlist);

router.get('/wishlist', auth.isLoggedIn, userController.viewWishlist);

router.post('/addToCart', userController.addToCart);
router.get('/cart',userController.viewCart);
router.get('/checkout' ,userController.loadCheckout);
router.post('/applyDiscount', userController.applyDiscount);
router.post('/processOrder', userController.processOrder);
router.post('/logout', userController.processLogout);







module.exports=router;