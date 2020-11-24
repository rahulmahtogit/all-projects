const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String       
    },
    facebookId:String,
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    emailStatus:{
        type:Boolean,
        default:false
    },
    mobileNoStatus:{
        type:Boolean,
        default:false
    },
    facebook_data: {
        access_token: String,
        
    },
    youtube_token: {
        access_token: String,
        refresh_token: String
    },

    tokens:[{
        token:{
            type:String
        }
    }]

})

// Middleware to Crypt the password
userSchema.pre('save',async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.methods = {
    generateAuthToken: async function(){
        const user = this
        const token =  jwt.sign({_id:user._id.toString()},"NANKJKDJDLKKXKCKX")
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
    }
}
 
userSchema.statics.findByCredentials = 
      async function(email,pass){
       
        const user = await User.findOne({email: email})
        console.log(user)
        if(!user){
           throw new Error("Han ji")
        }
        const checkPassword = await bcrypt.compare(pass,user.password)
        if(!checkPassword){
            throw new Error("Please enter the correct password")
        }
        return user


}





const User = mongoose.model('User',userSchema)
module.exports = User