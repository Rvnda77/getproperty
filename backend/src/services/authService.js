const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

const verifyToken = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return sendError(res, 'ID token is required', 400);
    }

    // Check if Firebase is initialized
    if (!process.env.FIREBASE_PROJECT_ID) {
      return sendError(res, 'Firebase authentication not configured', 500);
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    // Find or create user
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = new User({
        firebaseUid,
        email: decodedToken.email,
        displayName: decodedToken.name || decodedToken.email,
        isVerified: decodedToken.email_verified || false,
      });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    sendSuccess(res, {
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    sendError(res, 'Invalid token', 401);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendError(res, 'Refresh token is required', 400);
    }

    // For simplicity, we'll just verify the user exists
    // In production, implement proper refresh token logic
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const newToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    sendSuccess(res, { token: newToken });
  } catch (error) {
    sendError(res, 'Invalid refresh token', 401);
  }
};

module.exports = {
  verifyToken,
  refreshToken,
};