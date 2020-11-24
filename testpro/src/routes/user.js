const express = require('express')
const router =  express.Router()
const User = require('../models/user')
const {emailVerification, otpMiddleware} = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const nodemailMailgun = require('nodemailer-mailgun-transport')
const moment = require('moment')


// Domain and API Key for Mailgun
// In Mailgun you have to verify your Sender and Receiver EmailID on mailgun if you are using for testing purpose
// Because it create Spamming on mailgun domain
// IN real deployed project it will work fine
// I alreday Assigned my all testing email id on maligun site.


const auth = {
    auth:{
        api_key : '35c62b6bd6193dda47729a669558fdfb-2fbe671d-af1ca8f1',
        domain: 'sandboxb85929da60f94268aafd2b4b20940566.mailgun.org'
    }
}


// Signup API for User
router.post('/user/signup/',async (req,res)=>{
try {
    const user = new User(req.body)
    await user.save((err,data)=>{
        if(err){
            res.status(400).send()
        }
        
    })

let transporter = nodemailer.createTransport(nodemailMailgun(auth));
const baseUrl = req.protocol + "://" + req.get("host");
let mailOptions = {
    
    from: 'rahul21051995@gmail.com', // Sender Email
    to: req.body.email, //  email receiver
    subject: 'Email Verification',
    text: `${baseUrl}/user/emailverification/:${user._id}`
};

transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        res.status(401).send()
    }
    res.status(200).send("Email sent for Verification")
    
});
} catch (error) {
    res.status(400).send()
}       
})


// This API hit after url has been tapped in email
router.get('/user/emailverification/:id',async (req,res)=>{
    try {
        const _id = req.params.id.replace(':','')
    const user = await User.findById(_id)
    if(!user){
        res.status(400).send()
    }
    user.emailStatus = true
    await user.save()
     res.send({_id:user._id,message:"Your email Verfied Sucessfully"})
    } catch (error) {
        res.status(400).send()
    }
})


// API for sendind OTP on email
router.post('/user/sendOTP',emailVerification,async (req,res)=>{
    const user = await User.findById(req.body._id)
    if(!user){
        throw new Error()
    }
const otp = Math.floor(100000 + Math.random() * 900000)
let transporter = nodemailer.createTransport(nodemailMailgun(auth));
let mailOptions = {
    
    from: 'rahul21051995@gmail.com', //  You can Assign Domain address
    to: req.body.email, //  email receiver
    subject: 'OTP Message',
    text: `${otp}`
};

transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return res.status(400).send('Error occurs');
    }
    
});
user.otpStatus = otp
const otpGenratedTime = moment.utc()
user.otpGenratedTime = otpGenratedTime
await user.save()
res.status(200).send("Your OTP has been send on your email")        
})


// SignIN API for token Genration
router.post('/user/Signin',otpMiddleware,async (req,res)=>{


    try {
        const user = await User.findById(req.user._id)
    if(!user){
        res.status(400).send()
    }
    const token = jwt.sign({ _id: user._id.toString(),otpStatus:user.otpStatus}, "Secret Key for JWT")
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    res.send(user)
    } catch (error) {
        res.status(400).send()
    }
    
})


module.exports = router