const {Router, response, request} = require('express')
const router = Router()
const eventDB = require('../events.json')
const nedb = require('nedb-promises')
const userDB = nedb.create('userDB.db')
const orderDB = nedb.create('orderDB.db')
const apikeyChecker = require('../middleware/event')
const validateSchema = require('../middleware/event')


router.get('/menu', (request, response)=>{
    response.json({sccuess: true, eventDB})
})

router.post('/buy', apikeyChecker, validateSchema, (req, res)=>{
   
})

module.exports = router