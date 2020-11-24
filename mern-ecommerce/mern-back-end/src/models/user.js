



const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:2,
        max:20,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("First Name is Required")
            }
        }
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("Last Name is Required")
            }
        }
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true

    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter a valid email")
            }
        }
        
    },
    hash_password:{
        type:String,
        required:true,
        validate(value){
            if(value.length < 6){
                throw new Error("Password must be 6 character long")
            }
        }

    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contactNumber:{
        type:String
    },
    profilePicture:{
        type:String
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    
    ]

},

// Data Model ends


{
timestamps:true
})

userSchema.virtual('password').set(async function(password){
    this.hash_password = await bcrypt.hash(password,10)

})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString(),role:user.role }, process.env.privateKey);
    user.tokens = user.tokens.concat({token:token})
    await user.save()
    // console.log(user.tokens)
 

    return token
}

userSchema.statics.findByCredentials = async function  (email,password){
    
    const user = await User.findOne({email:email})

   if(!user){
       throw new Error("Unable to Login")
   }
   
   const isMatch = await bcrypt.compare(password,user.hash_password)
 

   if(!isMatch){
      throw new Error("Unable to Login")
   }
   
   return user
       

}

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

// userSchema.methods = {
//     authenticate:function(password){
//         return bcrypt.compareSync(password,this.hash_password)
//     }
// }

const User = mongoose.model("User",userSchema)

module.exports = User


console.log(new Date())