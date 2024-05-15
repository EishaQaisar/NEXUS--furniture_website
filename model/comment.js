const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username:{type:String, ref:'User'} ,// Reference to the User schema
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product schema
    content: String,
    // Other comment fields
});

module.exports = mongoose.model('Comment', commentSchema);
