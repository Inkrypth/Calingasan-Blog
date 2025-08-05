const Post = require('../models/Post');

// Like a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Remove from dislikes if like is present
        post.dislikes = post.dislikes.filter(
            (userId) => userId.toString() !== req.user
        );

        // Toggle like
        if (post.likes.includes(req.user)) {
            post.likes = post.likes.filter((userId) => userId.toString() !== req.user);
        } else {
            post.likes.push(req.user);
        }

        await post.save();
        res.status(200).json({
            message: 'Post reaction updated (like)',
            likes: post.likes.length,
            dislikes: post.dislikes.length
        });
    } catch(err) {
        res.status(500).json({ message: 'Failed to like post', error:err.message });
    }
};



// Disike a post
exports.dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Remove from likes if dislike is present
        post.likes = post.likes.filter(
            (userId) => userId.toString() !== req.user
        );

        // Toggle dislike
        if (post.dislikes.includes(req.user)) {
            post.dislikes = post.dislikes.filter((userId) => userId.toString() !== req.user);
        } else {
            post.dislikes.push(req.user);
        }

        await post.save();
        res.status(200).json({
            message: 'Post reaction updated (dislike)',
            likes: post.likes.length,
            dislikes: post.dislikes.length
        });
    } catch(err) {
        res.status(500).json({ message: 'Failed to dislike post', error:err.message });
    }
};