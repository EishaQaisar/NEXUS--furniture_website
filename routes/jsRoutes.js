const express = require('express');
const jsfile = require('../controllers/loginController');
const router = express.Router();
router.get('/register', registerView);
router.get('/login', loginView);
module.exports = router;