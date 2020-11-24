const {MongoClient,ObjectID} = require("mongodb")

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true} ,(error,client)=>{
    if(error){
        return console.log("Unable to comnect to database")
    }

    const db = client.db(databaseName)

    const updatePromise = db.collection('users').deleteMany({
        age : 25},
        )
    updatePromise.then((result)=>{
        console.log(result)

    }).catch((error)=>{
        console.log(error)
    })
   
})