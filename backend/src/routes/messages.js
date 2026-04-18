const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const messageService = require('../services/messageService');

// GET /api/messages/:propertyId
router.get('/:propertyId', auth, messageService.getMessages);

// POST /api/messages
router.post('/', auth, messageService.sendMessage);

module.exports = router;