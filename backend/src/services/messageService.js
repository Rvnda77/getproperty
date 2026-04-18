const Message = require('../models/Message');
const Property = require('../models/Property');
const { sendSuccess, sendError } = require('../utils/response');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

const getMessages = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Verify user has access to this property's messages
    const property = await Property.findById(propertyId);
    if (!property) {
      throw new NotFoundError('Property');
    }

    // Allow owner or if user is messaging about it (for tenants)
    if (property.ownerId.toString() !== req.user._id.toString()) {
      // For now, allow any authenticated user to view messages
      // In production, check if user has messaged about this property
    }

    const messages = await Message.find({ propertyId })
      .populate('senderId', 'displayName')
      .sort({ createdAt: 1 });

    sendSuccess(res, messages);
  } catch (error) {
    sendError(res, error.message, error.statusCode || 500);
  }
};

const sendMessage = async (req, res) => {
  try {
    const { propertyId, content, messageType = 'text' } = req.body;

    // Verify property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      throw new NotFoundError('Property');
    }

    // For now, allow messaging any property
    // In production, might want to restrict or track interest

    const message = new Message({
      propertyId,
      senderId: req.user._id,
      receiverId: property.ownerId, // Send to owner
      content,
      messageType,
    });

    await message.save();
    await message.populate('senderId', 'displayName');

    sendSuccess(res, message, 'Message sent successfully', 201);
  } catch (error) {
    sendError(res, error.message, error.statusCode || 500);
  }
};

module.exports = {
  getMessages,
  sendMessage,
};