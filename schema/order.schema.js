const joi = require('joi')

function schemaChecker(event){
    const schema = joi.object({
        userID: joi.string().allow('').required(),
        id: joi.number().required(),
        artist: joi.string().required(),
        date: joi.string().required(),
        arena: joi.string().required(),
        time: joi.string().required(),
        price: joi.string().required()
    })
    return schema.validate(event)
}
function userSchemachecker(user){
    const schema = joi.object({
        username: joi.string().required(),
        password: joi.string().required()
    })
    return schema.validate(user)
}

module.exports = {schemaChecker, userSchemachecker}