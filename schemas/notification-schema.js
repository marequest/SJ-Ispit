const Joi = require('joi');

module.exports.notificationSchema = Joi.object({
    sent_at: Joi.date().required(),
    contents: Joi.string().required(),
    patron_id: Joi.number().min(0).required(),
    id: Joi.number().min(0)
})