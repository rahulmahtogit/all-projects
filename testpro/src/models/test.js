const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String},
    password: { type: String},
    
});

// const Test = mongoose.model('Test', testSchema)
module.exports = testSchema