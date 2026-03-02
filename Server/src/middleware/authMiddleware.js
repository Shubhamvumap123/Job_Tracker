const jwt = require('jsonwebtoken');
const User = require('../model/User.Model');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            if (!process.env.JWT_SECRET) {
                console.error('JWT_SECRET environment variable is missing.');
                return res.status(500).json({ message: 'Server Configuration Error' });
            }

            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            if (typeof next === 'function') {
                next();
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
