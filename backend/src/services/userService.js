const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');
const { NotFoundError } = require('../utils/errors');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User');
    }

    sendSuccess(res, {
      id: user._id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      isVerified: user.isVerified,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    });
  } catch (error) {
    sendError(res, error.message, error.statusCode || 500);
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowedFields = ['displayName', 'phone', 'profilePicture'];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError('User');
    }

    sendSuccess(res, {
      id: user._id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      isVerified: user.isVerified,
      profilePicture: user.profilePicture,
    }, 'Profile updated successfully');
  } catch (error) {
    sendError(res, error.message, error.statusCode || 400);
  }
};

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User');
    }

    // Get user's properties if owner
    let myProperties = [];
    if (user.role === 'owner') {
      const Property = require('../models/Property');
      myProperties = await Property.find({ ownerId: user._id })
        .select('title propertyType transactionType price isActive createdAt')
        .sort({ createdAt: -1 });
    }

    // Get recent messages
    const Message = require('../models/Message');
    const recentMessages = await Message.find({
      $or: [{ senderId: user._id }, { receiverId: user._id }],
    })
      .populate('propertyId', 'title')
      .populate('senderId', 'displayName')
      .sort({ createdAt: -1 })
      .limit(10);

    sendSuccess(res, {
      user: {
        id: user._id,
        displayName: user.displayName,
        role: user.role,
        isVerified: user.isVerified,
      },
      myProperties,
      recentMessages,
    });
  } catch (error) {
    sendError(res, error.message, error.statusCode || 500);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getDashboard,
};