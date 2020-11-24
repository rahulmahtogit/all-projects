const jwt = require('jsonwebtoken')
const User = require('../models/user')



exports.tokenAuth = async (req,res,next)=>{
try {
    const token = req.headers.authorization.replace('Bearer ','')
    const decoded = jwt.verify(token,"NANKJKDJDLKKXKCKX")
    const user = await User.findOne({_id:decoded._id,'tokens.token':token})
    if(!user){
        throw new Error()
    }
    req.user = user
    req.token = token
    next()
} catch (error) {
    res.status(400).send("Please Authenticate")
}    
      
}