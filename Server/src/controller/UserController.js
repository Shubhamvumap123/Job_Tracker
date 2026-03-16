const User = require('../model/User.Model');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    // 🛡️ Sentinel: Fail securely if JWT secret is not provided
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is missing.');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user (Customer by default, or specific role if Admin)
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, department, skills } = req.body;

        // 1. Basic Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all required fields (name, email, password)' });
        }

        // 2. Email Format Validation
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        // 3. Password Strength Validation
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // 4. Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'customer', // Default to customer
            department: department || 'General',
            skills: skills || []
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Register Error:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            // Update availability to 'Available' on login if agent
            if (['agent', 'admin'].includes(user.role)) {
                user.availability = { status: 'Available', lastSeen: Date.now() };
                await user.save();
            }

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                skills: user.skills,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all agents (for assignment)
// @route   GET /api/users/agents
// @access  Private (Admin/Manager)
const getAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: { $in: ['agent', 'admin', 'manager'] } })
            .select('-password');
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAgents
};
