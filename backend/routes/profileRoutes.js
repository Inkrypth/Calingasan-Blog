const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const requireAuth = require('../middleware/authMiddleware');

// Protected Routes
router.get('/getProfile', requireAuth, getProfile);
router.patch('/updateProfile', requireAuth, updateProfile);

module.exports = router;