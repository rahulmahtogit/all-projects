const User = require("../models/user")
const mongoose = require('mongoose')
const express = require('express')

    exports.signup = async (req,res)=>{
    try {
        const che_user = await User.findOne({email:req.body.email})
        if(che_user){
            return res.status(400).send({error:"You already Registered"})
        }
        const user = new User(req.body)
        await user.save().then(()=>{
            
        }).catch((error)=>{
            res.status(400).send(error._message)
        })
        const token = await user.generateAuthToken()
        res.send({
            user,token
        })
        
    } catch (error) {
        res.status(400).send()
    }

    
    // User.findOne({email:req.body.email}).exec(
    //     (error,user)=>{
    //         if(user) {
    //             return res.status(400).json({
    //                 message:"User Alread registered"
    //             })
    //         }
    //         const {firstName,lastName,email,password,userName} =req.body
    //         const _user = new User({firstName,lastName,email,password,userName})
        
    //         _user.save((error,data)=>{
    //             if(error){
    //                 return res.status(400).json({
    //                     message:"Something Went wrong"
    //                 })
    //             }
    //             else if(data){
    //                 return res.status(201).json({
    //                     message:"User Created Successfully"
    //                 })
    //             }
    //         })
    //     })

}

exports.signin = async (req,res)=>{
   
     try {
    const user = await User.findByCredentials(req.body.email,req.body.password)
  
    const token = await user.generateAuthToken()


    res.send({
        user,token
    })
        
        
    } catch (error) {

        res.status(400).send()
        
    }
}

// exports.signout = (req,res) =>{
//     res.send("Hello")
// }

exports.profile = async (req, res)=>{
    const user = req.user
    res.send({
        user
    })
    

}