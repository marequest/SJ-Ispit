const Joi = require('joi');

module.exports.bookAuthorSchema = Joi.object({
    book_id: Joi.number().min(0).required(),
    author_id: Joi.number().min(0).required(),
    id: Joi.number().min(0)
})