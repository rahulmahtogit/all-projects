const express = require('express')
const router =  express.Router()
const Test = require('../db/mongoose')


router.post('/test',async (req,res)=>{
    const test = new Test(req.body)
    await test.save()
     res.send(test) 
    
})


module.exports = router