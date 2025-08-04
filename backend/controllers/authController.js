const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '1d'});
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Prevent email duplication
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ 
            message: 'Email already registered' 
        });

        const user = await User.create({ 
            name, 
            email, 
            password 
        });

        const token = createToken(user._id);
        res.status(201).json({ 
            message: 'User created successfully',
            user: { id: user._id, name: user.name, email: user.email }, 
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
};