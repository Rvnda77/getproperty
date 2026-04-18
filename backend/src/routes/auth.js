const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// POST /api/auth/verify
router.post('/verify', authService.verifyToken);

// POST /api/auth/refresh
router.post('/refresh', authService.refreshToken);

module.exports = router;