const nedb = require('nedb-promises')
const userDB = new nedb({filename: 'userDB.db', autoload: true})
const orderDB = new nedb({filename: 'orderDB.db', autoload: true})
const ticketDB = new nedb({filename: 'ticketsDB', autoload: true})


module.exports = { userDB, orderDB, ticketDB}