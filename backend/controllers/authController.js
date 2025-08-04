const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '1d'});
};

// Signup function
exports.signup = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

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

// Login function
exports.login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ 
            message: 'User does not exist' 
        });

        // Compare password
        const isMatch = await require('bcrypt').compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d'});

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};