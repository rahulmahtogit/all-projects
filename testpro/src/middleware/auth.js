const jwt = require('jsonwebtoken')
const User = require('../models/user')
const moment = require('moment')

const otpMiddleware = async (req,res,next)=>{
    try {
    const user = await User.findOne({_id:req.body._id,otpStatus:req.body.otp})
    if(!user){
        throw new Error()
    } 
    // Validation for OTP Expire after 2 minutes
    const m1 = moment.utc(user.otpGenratedTime).add(2,'minutes')
    const m2 = moment.utc()
    if(!m1.isSameOrAfter(m2)){
        return res.status(400).send("Your OTP is Expired")
    }
    
    req.user = user
    next()
        
    } catch (error) {
       res.status(401).send("Enter Valid OTP") 
    }
    }

    // Checking Useremail is verfied or Not
    const emailVerification = async (req,res,next)=>{
        try {
        const user = await User.findOne({_id:req.body._id})
        if(!user){
            throw new Error()
        } 
        if(!user.emailStatus){
            res.status(400).send("Your Email is Not Verfied Yet")
        }
        req.user = user
        next()
            
        } catch (error) {
           res.status(401).send("Your Email is Not Verfied Yet") 
        }
        }


module.exports = {emailVerification,otpMiddleware}