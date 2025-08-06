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
router.get('/get', getAllPosts);

// Protected
router.post('/create', requireAuth, createPost);
router.patch('/update/:id', requireAuth, updatePost);
router.delete('/delete/:id', requireAuth, deletePost);

module.exports = router;