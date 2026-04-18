const express = require('express');
const router = express.Router();
const { auth, optionalAuth } = require('../middleware/auth');
const propertyService = require('../services/propertyService');
const { validateCreateProperty, validateUpdateProperty } = require('../validations/property');

// GET /api/properties
router.get('/', optionalAuth, propertyService.getProperties);

// GET /api/properties/:id
router.get('/:id', optionalAuth, propertyService.getPropertyById);

// POST /api/properties
router.post('/', auth, validateCreateProperty, propertyService.createProperty);

// PUT /api/properties/:id
router.put('/:id', auth, validateUpdateProperty, propertyService.updateProperty);

// DELETE /api/properties/:id
router.delete('/:id', auth, propertyService.deleteProperty);

module.exports = router;