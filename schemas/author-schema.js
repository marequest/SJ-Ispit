const Joi = require('joi');

module.exports.authorSchema = Joi.object({
    name: Joi.string().min(3).required(),
    id: Joi.number().min(0)
})