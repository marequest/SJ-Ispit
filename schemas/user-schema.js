const Joi = require("joi");

module.exports.userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
  admin: Joi.boolean().required(),
});
