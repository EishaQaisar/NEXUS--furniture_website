const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String }, // Name of the product
        quantity: { type: Number, default: 1 } ,
        price: { type: Number }, // Price of the product
        category: { type: String } // Name of the product



    }],
    totalAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Carts', cartSchema);

