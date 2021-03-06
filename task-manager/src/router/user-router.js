const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')


const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)

    }
})

router.post('/users/login', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({
            user    ,token
        })
        // res.send(user) apply JSON.stringfy(user) before sending the data 
    } catch (e) {
        res.status(400).send()

    }
})

router.post('/users/logout',auth, async(req,res)=>{

      try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
          
      } catch (e) {

        res.status(500).send()
          
      }
 })

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        
        req.user.tokens = []

        await req.user.save()
        res.send()

    
        
    } catch (error) {
        res.status(500).send()
        
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)

})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
         const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(500).send()
    }

})

router.patch('/users/me',auth, async (req, res) => {
    // Logic for checking all update key present in database 
    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedupdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send("Error : Invalid Operation")
    }

    try {
        const user = req.user
        updates.forEach((update) => {
            user[update] = req.body[update]

        })
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new :true,runValidators:true}) 
        // new:save updated documents in user runValidators:validate data before updating
        // It will not working properly in middleware conecpt
        res.send(user)

    } catch (e) {
        res.status(404).send()
    }
})

router.delete('/users/me',auth, async (req, res) => {
    try {

        await req.user.populate('tasks').execPopulate()
        await req.user.remove()     
        res.send(req.user)

    } catch (e) {
        res.status(500).send()
    }
})

// Destination Directory
// Use multer npn for more info 
const upload = multer({
    // dest:'avatars',
    // avatars is file name which store all file
    limits:{
        fileSize:5000000
    },
    fileFilter(req,file,cb){
        let re = RegExp(/\.(jpg|jpeg|png)/)
        if(!re.test(file.originalname)){
            return cb(new Error('Please upload only jpg,jpeg,png file'))

        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width:150, height:150 }).png().toBuffer()
        req.user.avatar = buffer

        await req.user.save()
        res.send()
    
        // req.user.avatar = req.file.buffer / Incoming files from Client Side or Postman
        // await req.user.save()
  

    },(error,req,res,next)=>{
        res.status(400).send({error:error.message})
 
})
router.delete('/users/me/avatar',auth, upload.single('avatar'), async (req,res)=>{
     req.user.avatar= undefined
    await req.user.save()
    res.send()

})

router.get('/users/:id/avatar',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
        
    } catch (e) {
        res.status(404).send()
        
    }

})




module.exports = router