const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



exports.authen = async (req,res,next)=>{
    try {
        const token = req.header("Authorization").replace('Bearer ','')
        
    const decoded = jwt.verify(token,process.env.privateKey)
    const user = await User.findOne({_id:decoded._id,'tokens.token':token})
    if(!user){
        return res.status(400).send({mess:"Token is Invalid"})
    }
    req.token = token,
    req.user = user
    next()
    } catch (error) {
        res.status(400).send({error:"Token Authentication problem"})
        
    }
      


}

exports.userMiddleware = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(400).send({message:"User Access Denied"})
    }
    next()

}

exports.adminMiddleware = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).send({message:"Admin Access Denied"})
    }
    next()

}



