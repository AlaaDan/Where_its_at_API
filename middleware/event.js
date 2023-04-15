const events = require('../events.json')
const {schemaChecker, userSchemachecker} = require('../schema/order.schema')

function apikeyChecker(req, res, next){
    const apiKey = req.headers['api-key']

    if(apiKey && apiKey.includes(apiKey)){
        next()
    } else{
        const response = {
            error: "Access denied! API-Key must be proveded correctly"
        }
        res.json(response)
    }
}


function eventChecker(req, res, next){
    const userEvent = req.body
    if (events.events.some((eve )=> eve.artist === userEvent.artist)){
        const price = events.events.find((eve)=> eve.price === userEvent.price)?.price
        if (userEvent.price === price ){
            next()
        } else {
            res.status(400).json({success: false, message: "Invalid price"})
        }
    }else {
        res.status(400).json({success: false, message: "Event doesn't exist"})
    }
}

function validateEvent(req, res, next){
    const validation = schemaChecker(req.body)

    if(validation.error) return res.status(400).json({success: false, error: validation.error.message})
    next()


}

function validateUser(req,res,next){
    const userValidate  = userSchemachecker(req.body)

    if(userValidate.error) return res.status(400).json({success: false, error: validation.error.message})
    next()


}

module.exports = {apikeyChecker, eventChecker, validateEvent, validateUser} 