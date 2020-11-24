const express = require('express')
const env = require('dotenv').config()
require('./database/mongoose')
const app = express()
const port =  3007
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const youtubeRoutes = require('./routes/youtube')
const facebookRoutes = require('./routes/facebook')
const path = require('path')

const User = require('./models/user')
const queryString = require('query-string');
const axios = require('axios')

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')



// console.log(path.join(__dirname,'../templates'))

const publicDirectoryPath = path.join(__dirname,'../templates')
app.use(express.static(publicDirectoryPath))

app.use(express.json())




app.use(userRoutes)
app.use(postRoutes)
app.use(youtubeRoutes)
app.use(facebookRoutes)

// Config file
baseurl = `http://localhost:${port}` 





app.listen(port,()=>{
    console.log(`Server is connected on ${port}`)
})





