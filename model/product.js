const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: String,
    // Add any other fields you need for your product
});

module.exports = mongoose.model('Product', productSchema);
