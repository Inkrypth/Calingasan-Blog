const Post = require("../models/Post");

// Create new post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user
        });

        res.status(201).json({ message: 'Post created', post });
    } catch(err) {
        res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
};



// Display all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({ message: 'Failed to get posts', error: err.message });
    }
};



// Update post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.author.toString() !== req.user) {
            return res.status(403).json({ message: 'Not authorized to edit this post '});
        }

        if (title) post.title = title;
        if (content) post.content = content;

        await post.save();

        res.status(200).json({ message: 'Post updated', post });
    } catch(err) {
        res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
};



// Delete post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found '});
        if (post.author.toString() !== req.user) {
            return res.status(403).json({ message: 'Not authorized to delete this post '});
        }

        await Post.deleteOne({ _id: id });
        
        res.status(200).json({ message: 'Post deleted' });
    } catch(err) {
        res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
};