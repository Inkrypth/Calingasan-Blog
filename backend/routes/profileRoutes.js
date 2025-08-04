const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const requireAuth = require('../middleware/authMiddleware');

// Protected Routes
router.get('/', requireAuth, getProfile);
router.patch('/', requireAuth, updateProfile);

module.exports = router;