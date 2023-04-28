const Joi = require('joi');

module.exports.waitlistSchema = Joi.object({
    book_id: Joi.number().min(0).required(),
    patron_id: Joi.number().min(0).required(),
    id: Joi.number().min(0)
})