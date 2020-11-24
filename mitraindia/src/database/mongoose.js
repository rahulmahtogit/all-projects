const mongoose = require('mongoose')

const url = `mongodb+srv://taskapp:ran2%40atla@cluster0.talqj.mongodb.net/talento-backend?retryWrites=true&w=majority`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true}


// Database Connection
mongoose.connect(url,options).then(()=>{
    console.log("MongoDB Database Connected")
}).catch(()=>{
    console.log("Some Problem in Database Connection")
})