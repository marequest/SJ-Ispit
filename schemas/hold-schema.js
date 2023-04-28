const Joi = require('joi');

module.exports.holdSchema = Joi.object({
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    book_id: Joi.number().min(0).required(),
    patron_id: Joi.number().min(0).required(),
    id: Joi.number().min(0)
})