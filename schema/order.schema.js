const joi = require('joi')

function schemaChecker(event){
    const schema = joi.object({
        id: joi.number().required(),
        artist: joi.string().required,
        date: joi.string().required(),
        arena: joi.string().required,
        time: joi.string().required,
        price: joi.number().required
    })
    return schema.validate(event)
}

module.exports = schemaChecker