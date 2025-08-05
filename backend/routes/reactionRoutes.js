const express = require('express');
const router = express.Router();
const { likePost, dislikePost } = require('../controllers/reactionController');
const requireAuth = require('../middleware/authMiddleware');

// Protected routes
router.post('/like/:id', requireAuth, likePost);
router.post('/dislike/:id', requireAuth, dislikePost);

module.exports = router;