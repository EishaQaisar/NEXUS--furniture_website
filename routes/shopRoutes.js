const express= require('express');
const router= express.Router();
const Product = require('../model/product')
const Comment=require('../model/comment')

router.get('/', (req, res) => {
    res.render('shop');
});

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

// router.get('/account', (req, res) => {
//     res.render('account');
// });
router.get('/dining', (req, res) => {
    res.render('dining');
});
router.get('/bedroom', (req, res) => {
    res.render('bedroom');
});
// router.get('/shop/bed1', (req, res) => {
//     res.render('shop/bed1');
// });
router.get('/shop/bed1', async (req, res) => {
    try {
        console.log("effer")

        const product = await Product.findOne({ name: "bed1" });
        console.log("effer")
        console.log(product)

        const comments = await Comment.find({ product: product._id });
        console.log("effer")

        res.render('shop/bed1', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.get('/shop/bed2', (req, res) => {
//     res.render('shop/bed2');
// });
router.get('/shop/bed2', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed2" });
        const comments = await Comment.find({ product: product._id });
        
        res.render('shop/bed2', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/shop/bed3', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed3" });
        const comments = await Comment.find({ product: product._id });
        res.render('shop/bed3', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/shop/bed4', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed4" });
        const comments = await Comment.find({ product: product._id });
        res.render('shop/bed4', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});router.get('/shop/bed5', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed5" });
        const comments = await Comment.find({ product: product._id });
        res.render('shop/bed5', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});router.get('/shop/bed6', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed6" });
        const comments = await Comment.find({ product: product._id });
        res.render('shop/bed6', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});router.get('/shop/bed7', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed7" });
        const comments = await Comment.find({ product: product._id });
        res.render('shop/bed7', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
router.get('/shop/bed8', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed8" });
        const comments = await Comment.find({ product: product._id });
        res.render('shop/bed8', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/shop/bed9', async (req, res) => {
    try {
        const product = await Product.findOne({ name: "bed9" });
        const comments = await Comment.find({ product: product._id });
        res.render('shop/bed9', { product, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/shop/dining2', (req, res) => {
    res.render('shop/dining2');
});
router.get('/shop/dining3', (req, res) => {
    res.render('shop/dining3');
});
router.get('/shop/dining4', (req, res) => {
    res.render('shop/dining4');
});
router.get('/shop/dining5', (req, res) => {
    res.render('shop/dining5');
});
router.get('/shop/dining6', (req, res) => {
    res.render('shop/dining6');
});
router.get('/shop/dining7', (req, res) => {
    res.render('shop/dining7');
});
router.get('/shop/dining8', (req, res) => {
    res.render('shop/dining8');
});
router.get('/shop/dining9', (req, res) => {
    res.render('shop/dining9');
});
router.get('/shop/dining10', (req, res) => {
    res.render('shop/dining10');
});





 

module.exports=router;