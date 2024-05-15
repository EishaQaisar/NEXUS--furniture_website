// userController.js

const userModel = require('../model/userModel');
const Otp = require('../model/otp');
const mongoose = require('mongoose');


const User = require('../src/config').collection; 
const randomstring=require("randomstring")
const nodemailer=require("nodemailer")
const bcrypt = require('bcrypt');
const {oneMinuteExpiry, threeMinuteExpiry}= require('./otpValidate') 
const Comment = require('../model/comment');
const Product = require('../model/product')
const Wishlist=require('../model/wishlist')
const url=require('url')
const Cart = require('../model/cart');






async function signup(req, res) {
    const { username, password,email,verified ,token} = req.body;
    try {
        const newUser = await userModel.createUser(username, password,email,verified,token);
        console.log("sign")
        sendotp(username, email, verified);
        console.log("after")
        res.render('enterotp',{ successMessage: '' })
        // res.send('User registered successfully!');
        //sendVerifyMail(username,email,newUser._id);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user= await userModel.loginUser(username, password);
        console.log("yaa");
        req.session.user_id = user._id;
        // res.send('Login successful.');
        res.render('index')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const sendPasswordResetEmail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            requireTLS: true,
            secure: false,
            auth: {
                user: 'f219108@cfd.nu.edu.pk',
                pass: 'eishaNUCES9108$'
            },
            tls: {
                rejectUnauthorized: false // Accept self-signed certificates
            }
        });

        const mailOptions = {
            from: 'f219108@cfd.nu.edu.pk',
            to: email,
            subject: 'Reset Your Password',
            html: '<p>Click <a href="http://localhost:5000/resetPassword?token=' + token + '">here</a> to reset your password</p>'
        };
        

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log(error);
        throw new Error('Error sending email');
    }
};

const forgetPassword=async(req,res)=>{
    try {
        console.log("called")

        const username=req.body.username;
        console.log(username)
        const userData= await User.findOne({name:username});
        console.log("ferf")
        if (userData) {
            console.log("ferf", userData)
            const randomString = randomstring.generate();
            const data = await User.updateOne({ name: username }, { $set: { token: randomString } });
            sendPasswordResetEmail(userData.name, userData.email, randomString);
            res.status(200).send({ success: true, msg: "Please check your email" });
        }
        else {
            console.log("ffvdvgfverf")
            res.render('forget', { message: "Email does not exist" });
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
   
}

const resetPassword = async (req, res) => {
    try {
        if (req.query.token == undefined) {
            console.log("Token is undefined");
            return res.render('404');
        }
        const resetData = await User.findOne({ token: req.query.token });
        if (!resetData) {
            console.log("Reset data not found");
            return res.render('404');
        }
        console.log("Reset data:", resetData);
        return res.render('resetPassword', { resetData });
    } catch (error) {
        console.log("Error:", error.message);
        return res.render('404');
    }
}

const updatePassword=async(req,res)=>{
    try {
        const {user_id, password, c_password}= req.body;
        const resetData= await User.findOne({_id:user_id})
        if (password!= c_password){
            return res.render('resetPassowrd', { resetData, error:"confirm password doesnt match"})
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const data= await User.updateOne({_id:user_id},{$set: {password:hashedPassword}});

    } catch (error) {
        console.log(error.message)
        
    }
   
}


// const forgetPassword = (req, res) => {
//     // Dummy logic for forget password functionality
//     // This function will be called when the "Forget Password" button is clicked
//     console.log("Forget password button clicked!");
// };

const generateRandom4Digit=async()=>{
    return Math.floor(1000 + Math.random() * 9000);
}
const sendotp = async (username, email, verified) => {
    try{
        // const { email } = req.body;
        const userData = await User.findOne({ email });
        // if(!userData) {
        //     return res.status(400).json({
        //     success: false,
        //     msg: "Email doesn't exists!"
        //     });
        // }
        // if(userData.is_verified == True){
        //     return res.status(400).json({
        //     success: false,
        //     msg: userData.email+" mail is already verified!"
        // });
        // }
        g_otp= await generateRandom4Digit();
        // const oldOtpDtata= await Otp.findOne({user_id: userData._id});
        // if (oldOtpData){
        //     const sentNextOtp= await oneMinuteExpiry(oldOtpDtata);
        //     if (!sendNextOtp){
        //         return res.status(400).json({
        //             succes:false,
        //             msg:'try after some time'

        //         });
        //     }
        // }

        
        // const cDate = new Date();
        // await Otp.findOneAndUpdate(
        // { user_id: userData._id },
        // { otp: g_otp, timestamp: new Date(cDate.getTime()) },
        // { upsert: true, new: true, setDefaultsOnInsert: true });

        const enter_otp=new Otp({
            user_id:userData._id,
            name: userData.name,
            otp:g_otp
        })
        await enter_otp.save();
       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            requireTLS: true,
            secure: false,
            auth: {
                user: 'f219108@cfd.nu.edu.pk',
                pass: 'eishaNUCES9108$'
            },
            tls: {
                rejectUnauthorized: false // Accept self-signed certificates
            }
        });

        const mailOptions = {
            from: 'f219108@cfd.nu.edu.pk',
            to: userData.email,
            subject: 'OTP Email Verification',
            html: '<p>Your OTP is: '+ g_otp + '.</p>'
        };
        

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);


        // return res.status(200).json({
        //     success: true,
        //     msg: 'Verification Link sent to your mail, please check!'
        // });
    }
    catch{
        console.log("err")


    }
}

const VerifyOtp= async(req,res)=>{
    try{
        const  {username, otp}=req.body;
        const otpData=await Otp.findOne({
            name:username, otp
        });
        if (!otpData){
            return res.status(400).json({
                success:false,
                msg:'Invalid Otp'
            })
        }
        const isOtpExpired=await threeMinuteExpiry(otpData.timestamp);
        if (isOtpExpired){
            return res.status(400).json({
                success:false,
                msg:'Otp Expired'
            })
        }
        const user=await User.findOneAndUpdate({name:username}, {$set:{verified:true}});
        req.session.user_id = user._id;

        // return res.status(400).json({
        //     success:true,
        //     msg:'User registered successfully'
        // })
        res.render('index',{ successMessage: 'Verified' })

        

    }
    catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

const loadAccount= async(req, res)=>{
    try{

        res.render('account');

    }
    catch{
        console.log(error.message)
    }
}

const addComment = async (req, res) => {
    try {
        const { comment } = req.body; // Assuming comment is sent from the front end
        const productName = req.body.productname; // Extracting productName from the request body

        // Find the product in the database based on the product name
        const product = await Product.findOne({ name: productName });
        console.log(productName)
        const userData = await User.findOne({ _id: req.session.user_id });
        console.log(userData);


        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let userId;
        let userName;

        if (req.session.user_id) {
            // User is logged in, use their user ID
            userId = req.session.user_id;
            userName= userData.name;
        } else {
            // User is not logged in, use a default or anonymous user ID
            userId = null; 
            userName= 'anonymous';

        }

        const referer = req.headers.referer;
        const refererPath = new URL(referer).pathname.slice(1);



        const newComment = await Comment.create({ user: userId, username:userName, product: product._id, content: comment });
        const comments = await Comment.find({ product: product._id });
        res.render(refererPath, { product, comments });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const userId = req.session.user_id; // Get the user ID from the session
        const productName = req.body.productname; 
        const product = await Product.findOne({ name: productName });
        console.log(product)


        // Add the product to the user's wishlist
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $addToSet: { product: product._id } }, // Add productId to the wishlist if it doesn't already exist
            { upsert: true, new: true } // Create a new wishlist if it doesn't exist
        );
        
        const userData= await User.findById({_id: req.session.user_id});

        const comments = await Comment.find({ product: product._id });
        const referer = req.headers.referer;
        const refererPath = new URL(referer).pathname.slice(1)
        res.render(refererPath, { product, comments });



    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const viewWishlist = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const wishlist = await Wishlist.findOne({ user: userId }).populate('product'); // Assuming 'products' is the field containing the list of product IDs in the wishlist
        res.render('wishlist', { wishlist });
    } catch (error) {
        console.error('Error viewing wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const addToCart = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const productName = req.body.productname;
        const quantity = parseInt(req.body.quantity); // Parse the quantity to ensure it's a number

        const product = await Product.findOne({ name: productName });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart;

        if (userId) {
            cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = await Cart.create({ user: userId, items: [{ product: product._id, quantity }] });
            } else {
                const existingItem = cart.items.find(item => item.product.equals(product._id));
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.items.push({ product: product._id, quantity });
                }
                await cart.save();
            }
        } else {
            req.session.cart = req.session.cart || { items: [] };
            const existingProductIndex = req.session.cart.items.findIndex(item => item.product.toString() === product._id.toString());
            if (existingProductIndex !== -1) {
                req.session.cart.items[existingProductIndex].quantity += quantity;
            } else {
                req.session.cart.items.push({ product: product._id, quantity });
            }
            console.log(req.session.cart)
        }

        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const viewCart = async (req, res) => {
    try {
        const userId = req.session.user_id;

        if (userId) {
            // If user is logged in, fetch cart details from the database
            const cart = await Cart.findOne({ user: userId }).populate('items.product');
            res.render('cart', { cart });
        } else {
            // If user is not logged in, retrieve cart contents from session
            console.log(req.session.cart)
            const cart = req.session.cart ;
            res.render('cart', { cart });
        }
    } catch (error) {
        console.error('Error viewing cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    forgetPassword,
    signup,
    login,
    resetPassword,
    updatePassword, 
    sendotp,
    VerifyOtp,
    loadAccount, 
    addComment,
    addToWishlist,
    viewWishlist,
    addToCart,
    viewCart
};
