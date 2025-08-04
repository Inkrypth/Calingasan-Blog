const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const requireAuth = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected test routes
router.get('/me', requireAuth, (req, res) => {
    res.json({ message: 'You are authenticated', userID: req.user });
});

module.exports = router;