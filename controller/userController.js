// userController.js

const userModel = require('../model/userModel');
const User = require('../src/config'); 
const randomstring=require("randomstring")
const nodemailer=require("nodemailer")
const bcrypt = require('bcrypt');



async function signup(req, res) {
    const { username, password,email,verified ,token} = req.body;
    try {
        const newUser = await userModel.createUser(username, password,email,verified,token);
        res.send('User registered successfully!');
        // sendVerifyMail(username,email,newUser._id);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        await userModel.loginUser(username, password);
        res.send('Login successful.');
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
        const username=req.body.username;
        console.log(username)
        const userData= await User.findOne({name:username});
        console.log("ferf")
        if (userData){
            console.log("ferf", userData)
            // res.render('forget', {message:"mail is  exist"})
            const randomString=randomstring.generate();
            const data= await User.updateOne({name:username},{$set: {token:randomString}});
            sendPasswordResetEmail(userData.name, userData.email, randomString);
            res.status(200).send({success:true, msg:"Please check your email"});


        }
        else{
            console.log("ffvdvgfverf")
            res.render('forget', {message:"mail is not exist"})
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


module.exports = {
    forgetPassword,
    signup,
    login,
    resetPassword,
    updatePassword
};
