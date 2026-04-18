const Property = require('../models/Property');
const { sendSuccess, sendError } = require('../utils/response');
const { NotFoundError } = require('../utils/errors');

const getProperties = async (req, res) => {
  try {
    const {
      city,
      propertyType,
      transactionType,
      minPrice,
      maxPrice,
      bedrooms,
      limit = 10,
      page = 1,
    } = req.query;

    const query = { isActive: true };

    if (city) query['address.city'] = new RegExp(city, 'i');
    if (propertyType) query.propertyType = propertyType;
    if (transactionType) query.transactionType = transactionType;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };

    const properties = await Property.find(query)
      .populate('ownerId', 'displayName email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Property.countDocuments(query);

    sendSuccess(res, {
      properties,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    sendError(res, error.message);
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('ownerId', 'displayName email phone');

    if (!property) {
      throw new NotFoundError('Property');
    }

    // Increment view count
    await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    sendSuccess(res, property);
  } catch (error) {
    sendError(res, error.message, error.statusCode || 500);
  }
};

const createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      ownerId: req.user._id,
    };

    const property = new Property(propertyData);
    await property.save();

    sendSuccess(res, property, 'Property created successfully', 201);
  } catch (error) {
    sendError(res, error.message, 400);
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!property) {
      throw new NotFoundError('Property');
    }

    Object.assign(property, req.body);
    await property.save();

    sendSuccess(res, property, 'Property updated successfully');
  } catch (error) {
    sendError(res, error.message, error.statusCode || 500);
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!property) {
      throw new NotFoundError('Property');
    }

    sendSuccess(res, null, 'Property deleted successfully');
  } catch (error) {
    sendError(res, error.message, error.statusCode || 500);
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};