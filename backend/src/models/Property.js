const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
    maxlength: 2000,
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'office', 'shop'],
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['rent', 'sale'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  area: {
    type: Number,
    required: true,
    min: 1,
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  amenities: [String],
  photos: [{
    url: { type: String, required: true },
    alt: { type: String },
    order: { type: Number, default: 0 },
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
});

// Update the updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for performance
propertySchema.index({ ownerId: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ transactionType: 1 });
propertySchema.index({ 'address.city': 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ createdAt: -1 });
propertySchema.index({ isActive: 1 });

module.exports = mongoose.model('Property', propertySchema);