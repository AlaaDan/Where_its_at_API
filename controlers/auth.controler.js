const { v4: uuidv4 } = require('uuid')
const {ticketDB, orderDB, userDB} = require('../Database/db')


async function createUser (req, res){
    const {username, password} = req.body
    const userExists = await userDB.findOne({username})
    const apiKey = uuidv4()

    if(userExists){
        res.status(400).json({success: false, message: "Already registered"})
    } else{
        await userDB.insert({username, password, apiKey})
    }
    res.status(200).json({success: true, username: username, apiKey: apiKey})

}

async function login(req, res){
    const {username, password} = req.body
    const userInfo = await userDB.findOne({username})

    if(userInfo){

        if( password !== userInfo.password){
            res.status(403).json({success: false , message: "Access denied, wrong password!"})
        } else {
            res.status(200).json({sccuess: true, Username: userInfo.username, apiKey: userInfo.apiKey})
        }
    }else {
        res.status(400).json({success: false, message: "Username not found, try to create a username first!"})
    }
}

module.exports = { createUser, login }