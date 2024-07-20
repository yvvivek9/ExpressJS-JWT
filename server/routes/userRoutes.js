const express = require('express');
const { getUserProfile } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/profile', authMiddleware, getUserProfile);

module.exports = router;
