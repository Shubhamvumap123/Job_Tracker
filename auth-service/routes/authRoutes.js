const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    getAgents
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/agents', protect, getAgents);

module.exports = router;
