const Joi = require('joi');

module.exports.checkoutSchema = Joi.object({
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    book_copy_id: Joi.number().min(0).required(),
    patron_id: Joi.number().min(0).required(),
    is_returned: Joi.boolean().required(),
    id: Joi.number().min(0)
})