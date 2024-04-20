// userModel.js

const User = require('../src/config'); // Assuming 'User' is your Mongoose model
const bcrypt = require('bcrypt');

async function createUser(username, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
        name: username,
        password: hashedPassword
    };

    const existingUser = await User.findOne({ name: username });
    if (existingUser) {
        throw new Error('User already exists. Please choose a different username.');
    }

    const newUser = await User.create(userData); // Use the create method to insert a new document
    return newUser;
}


async function loginUser(username, password) {
    const user = await User.findOne({ name: username });
    if (!user) {
        throw new Error('User not found.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Incorrect password.');
    }

    return user;
}


module.exports = {
    createUser,
    loginUser
};
