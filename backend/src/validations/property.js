const Joi = require('joi');

const addressSchema = Joi.object({
  street: Joi.string().trim().min(5).max(200).required(),
  city: Joi.string().trim().min(2).max(100).required(),
  state: Joi.string().trim().min(2).max(100).required(),
  pincode: Joi.string().trim().pattern(/^[0-9]{5,10}$/).required(),
  country: Joi.string().trim().min(2).max(100).default('India'),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).optional(),
    lng: Joi.number().min(-180).max(180).optional(),
  }).optional(),
});

const propertySchema = Joi.object({
  title: Joi.string().trim().min(10).max(100).required(),
  description: Joi.string().trim().min(50).max(2000).required(),
  propertyType: Joi.string()
    .valid('apartment', 'house', 'villa', 'office', 'shop')
    .required(),
  transactionType: Joi.string().valid('rent', 'sale').required(),
  price: Joi.number().positive().required(),
  area: Joi.number().positive().required(),
  bedrooms: Joi.number().integer().min(0).max(20).required(),
  bathrooms: Joi.number().integer().min(0).max(20).required(),
  address: addressSchema.required(),
  amenities: Joi.array().items(Joi.string().trim()).optional(),
  photos: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().trim().allow(''),
        order: Joi.number().integer().min(0).default(0),
      })
    )
    .min(1)
    .required(),
  isActive: Joi.boolean().optional(),
  isVerified: Joi.boolean().optional(),
});

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Property validation failed',
        errors,
      });
    }

    req.body = value;
    next();
  };
};

module.exports = {
  validateCreateProperty: validateSchema(propertySchema),
  validateUpdateProperty: validateSchema(propertySchema.fork(['title', 'description', 'propertyType', 'transactionType', 'price', 'area', 'bedrooms', 'bathrooms', 'address', 'photos'], (schema) => schema.optional())),
};