const joi = require('joi')

const schema = joi.object({
    id: joi.number().required(),
    artist: joi.string().required,
    date: joi.string().required(),
    arena: joi.string().required,
    time: joi.string().required,
    price: joi.number().required
})

module.exports = schema