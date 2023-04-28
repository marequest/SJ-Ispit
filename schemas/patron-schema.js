const Joi = require('joi');

module.exports.patronSchema = Joi.object({
    first_name: Joi.string().min(3).required(),
    surname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    status: Joi.boolean().required(),
    id: Joi.number().min(0)
})