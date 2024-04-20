// userController.js

const userModel = require('../model/userModel');
const nodemailer=require("nodemailer")

async function signup(req, res) {
    const { username, password,email,verified } = req.body;
    try {
        const newUser = await userModel.createUser(username, password,email,verified);
        res.send('User registered successfully!');
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

module.exports = {
    signup,
    login
};
