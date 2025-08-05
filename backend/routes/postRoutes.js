const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
} = require('../controllers/postController');

// Public: Display all posts
router.get('/', getAllPosts);

// Protected
router.post('/', requireAuth, createPost);
router.patch('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);

module.exports = router;