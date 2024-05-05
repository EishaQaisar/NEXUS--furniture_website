const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/bookstore");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        required:true
    },
    token:{
        type:String,
        default:""
    }

});

// collection part
const collection = new mongoose.model("books", Loginschema);

module.exports = collection;