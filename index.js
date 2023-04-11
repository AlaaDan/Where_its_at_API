const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const menuRouter = require('./routers/menu')

app.use(express.json())

app.use('/api', menuRouter )

app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`)
})