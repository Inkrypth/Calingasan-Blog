const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: '1d'});
};

