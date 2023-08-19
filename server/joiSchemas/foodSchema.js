const Joi = require('joi');

module.exports.foodSchema = Joi.object({
    food_name: Joi.string().required().max(100),
    description: Joi.string().required().max(65535),
    location: Joi.string().required().max(150),
    images_delete: Joi.array()
});