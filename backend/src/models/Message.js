const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000,
  },
  messageType: {
    type: String,
    enum: ['text', 'image'],
    default: 'text',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
messageSchema.index({ propertyId: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ receiverId: 1 });
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);