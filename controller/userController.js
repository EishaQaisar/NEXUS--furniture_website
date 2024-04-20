// userController.js

const userModel = require('../model/userModel');

async function signup(req, res) {
    const { username, password } = req.body;
    try {
        const newUser = await userModel.createUser(username, password);
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
