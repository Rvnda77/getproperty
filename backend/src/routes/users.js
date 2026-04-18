const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const userService = require('../services/userService');

// GET /api/users/profile
router.get('/profile', auth, userService.getProfile);

// PUT /api/users/profile
router.put('/profile', auth, userService.updateProfile);

// GET /api/users/dashboard
router.get('/dashboard', auth, userService.getDashboard);

module.exports = router;