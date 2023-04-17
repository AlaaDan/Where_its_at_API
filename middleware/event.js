const events = require('../events.json')
const {schemaChecker, userSchemachecker} = require('../schema/order.schema')
const { userDB } = require('../Database/db.js')
const { response } = require('express')

async function apikeyChecker(req, res, next){
    const apiKey = req.headers['api-key']
    console.log(apiKey)
    const api = await userDB.findOne({apiKey})

    if(apiKey){
        console.log("Is key")
        if (api){
            console.log(api.apiKey)
            next()
        }
    } 
    if(!api){
        console.log("Not API")
        const response = {
            error: "Access denied! API-Key must be proveded correctly"
        }
        res.json(response)
    }
}


function eventChecker(req, res, next){
    const userEvent = req.body
    if (events.events.some((eve )=> eve.artist === userEvent.artist)){
        console.log('Artiest is matached ')
        const price = events.events.find((eve)=> eve.price === userEvent.price)?.price
        if (userEvent.price === price ){
            console.log("price is matched")
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

    if(userValidate.error) return res.status(400).json({success: false, error: userValidate.error.message})
    next()


}

module.exports = {apikeyChecker, eventChecker, validateEvent, validateUser} 