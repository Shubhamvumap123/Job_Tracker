const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // 🛡️ Sentinel: Do not fallback to a hardcoded secret for JWT verification
            if (!process.env.JWT_SECRET) {
                console.error("CRITICAL ERROR: JWT_SECRET environment variable is missing");
                return res.status(500).json({ message: "Server misconfiguration" });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Populate user from the token payload (Stateless)
            // The token now contains { id, name, email, role }
            req.user = {
                id: decoded.id,
                _id: decoded.id, // Providing _id for Mongoose query compatibility
                name: decoded.name,
                email: decoded.email,
                role: decoded.role
            };

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
