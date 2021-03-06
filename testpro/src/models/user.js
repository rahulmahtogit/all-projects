const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    emailStatus: { type: Boolean, default: false },
    otpStatus: { type: String },
    otpGenratedTime:{type:Date},
    tokens: [{
        token: {
            type: String
        }
    }],


});
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()

})

const User = mongoose.model('User', userSchema)
module.exports = User