const Joi = require('joi');

module.exports.userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
});
