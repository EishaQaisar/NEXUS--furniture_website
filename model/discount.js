const mongoose = require('mongoose');

// Define the discount schema
const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true // Ensures each discount code is unique
    },
    amount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true // Indicates if the discount is currently active or not
    }
}); // Adds createdAt and updatedAt fields to the schema

// Create a model from the schema

module.exports = mongoose.model('Discount', discountSchema);
