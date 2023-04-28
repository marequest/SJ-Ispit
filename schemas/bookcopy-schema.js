const Joi = require('joi');

module.exports.bookCopySchema = Joi.object({
    year_published: Joi.number().min(1500).max(2023).required(),
    book_id: Joi.number().min(0).required(),
    publisher_id: Joi.number().min(0).required(),
    id: Joi.number().min(0)
})