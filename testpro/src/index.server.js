const express = require('express')
require('./db/mongoose')
const app = express()
const userRoutes = require('./routes/user')
const testRoutes = require('./routes/test')


app.use(express.json())

app.use(userRoutes)
app.use(testRoutes)

// I assigend port Manully You can assign through env
app.listen(3006,()=>{
    console.log(`server is connected on 3006`)
})
