const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');

// Test Route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth route working!' });
});

// Signup route
router.post('/signup', signup);

module.exports = router;