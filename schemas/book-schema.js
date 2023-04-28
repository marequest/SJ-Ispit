const Joi = require('joi');

module.exports.bookSchema = Joi.object({
    title: Joi.string().min(4).required()
})