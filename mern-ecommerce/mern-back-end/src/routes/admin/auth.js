const express = require('express')
const { signup, signin, signout} = require('../../controllers/admin/auth')
// const User = require("../models/user")
const {authen,adminMiddleware} = require('../../middleware/authen')

const router = express.Router()



router.post('/admin/signup', signup)
router.post('/admin/signin',signin)
router.post('/admin/signout',authen,adminMiddleware,signout)





module.exports= router