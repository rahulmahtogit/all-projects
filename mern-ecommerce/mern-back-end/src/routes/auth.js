const express = require('express')
const { signup, signin, profile } = require('../controllers/auth')
// const User = require("../models/user")
const authen = require('../middleware/authen')

const router = express.Router()



router.post('/signup', signup)
router.post('/signin',signin)
router.get('/profile', profile)

module.exports= router