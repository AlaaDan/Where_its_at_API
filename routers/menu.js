const {Router, response, request} = require('express')
const router = Router()
const eventDB = require('../events.json')
const nedb = require('nedb-promises')
const userDB = nedb.create('userDB.db')
const orderDB = nedb.create('orderDB.db')

router.get('/menu', (request, response)=>{
    response.json({sccuess: true, eventDB})
})

router.post('/buy', (req, res)=>{

})

module.exports = router