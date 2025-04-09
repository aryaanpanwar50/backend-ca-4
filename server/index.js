const express = require('express')
const connectDB = require('./db')
const app = express()
const cookieParser = require('cookie-parser')
const userRoutes = require('./user.routes')


app.use(express.json())
app.use(cookieParser())
app.use('/',userRoutes)



app.listen(4000,async()=>{
    try{
        await connectDB()
        console.log("The server is running on port 4000")
    }catch(error){
        console.error(error.message)
    }
})