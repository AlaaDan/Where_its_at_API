const {Router, response, request} = require('express')
const router = Router()
const eventDB = require('../events.json')
const {apikeyChecker, validateEvent, eventChecker, validateUser} = require('../middleware/event')
const {ticketDB, orderDB} = require('../Database/db')
const {createUser, login} = require("../controlers/auth.controler")
router.get('/events', (request, response)=>{
    const db = eventDB.events
    response.json({sccuess: true, Event: db})
})

router.post('/buy', validateEvent, eventChecker,apikeyChecker, async (req, res)=>{
    const event =  req.body
    await orderDB.insert(event)
    
    res.json({success: true, event})
   
})

router.post('/signup', validateUser , createUser)

router.post('/login', validateUser, login )

module.exports = router