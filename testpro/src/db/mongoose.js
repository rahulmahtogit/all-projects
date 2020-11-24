const mongoose = require('mongoose')
// This is my real ID of mongodb Atlas

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ran2mysq',
  database: 'testingdatabse'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()


// const conn = mongoose.createConnection(`mongodb+srv://taskapp:ran2%40atla@cluster0.talqj.mongodb.net/testdb?retryWrites=true&w=majority`,
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// })
// conn.then(()=>{console.log("Database connected")})
// const Test = conn.model('Test', require('../models/test'));

// module.exports = Test

// mongoose.connect(`mongodb+srv://taskapp:ran2%40atla@cluster0.talqj.mongodb.net/testdb?retryWrites=true&w=majority`, 
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// }).then(()=>{
//     console.log("Database connected")
    
// })

