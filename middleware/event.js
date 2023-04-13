const events = require('../events.json')
const schemaChecker = require('../schema/order.schema')

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
    if (events.some((eve )=> eve.title === userEvent.name)){
        const price = events.find((eve)=> eve.title === userEvent.title)?.price
        if (userEvent === price ){
            next()
        } else {
            res.status(400).json({success: false, message: "Invalid price"})
        }
    }else {
        res.status(400).json({success: false, message: "Event doesn't exist"})
    }
}

function validateSchema(req, res, next){
    const validation = schemaChecker(req.body)

    if(validation?.error){
        res.status(400).json({success: false, erro: validation.erro.message})
    }else{
        next()
    }
}

module.exports = apikeyChecker, eventChecker, validateSchema 