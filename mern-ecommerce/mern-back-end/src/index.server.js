const express = require('express')
const env  = require('dotenv')
const app = express()
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart')
const path = require('path')





// Envirment variable
env.config();

// MongoDB Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.talqj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}).then(()=>{
     console.log("Database is connected")
 });


 app.use(express.json())
//  expose uploads file to the browser
app.use('/public',express.static(path.join(__dirname,"uploads")))
//  every user will be prefix with api default is /
 app.use('/api',authRoutes);
 app.use('/api',adminRoutes);
 app.use('/api',categoryRoutes);
 app.use('/api',productRoutes)
 app.use('/api',cartRoutes)




app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on port ${process.env.PORT}`)
})


// const Category = require('./models/category')
// const User = require('./models/user')

// const user = new User({
//     "firstName":"Admin5",
//    "lastName":"kumar",
//    "userName":"admin5",
//    "email":"admin5@gmail.com",
//    "password":"admin5@123"
// })




// const main = async ()=>{
//     const cat = await Category.findOne({_id:"5f72230e10c463197c1b1790"})
//     const user = await User.findOne({email:"rahul@gmail.com"})
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     // const user = await User.findById(cat.parentId)
//     // await user.populate('tasks').execPopulate()
//     // console.log(user.tasks)
//    console.log(cat)
//    console.log(user.password)
// }


// main()