const express= require('express');
const controller = require('../controller/userController');

const router= express.Router();

router.get('/', (req, res) => {
    res.render('forget');

});



router.post('/forget', controller.forgetPassword);
router.get('/resetPassword',  controller.resetPassword);

router.post('/resetPassword',  controller.updatePassword);
router.post('/verify-otp',  controller.VerifyOtp);



module.exports=router;