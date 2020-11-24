const express = require('express')
const router = express.Router()
const {tokenAuth} = require('../middleware/auth')
const {facebookLogin,facebookAuth,getFBData} = require('../controllers/facebook')



router.get('/facebookLogin',facebookLogin)
router.get('/authenticate/facebook/',tokenAuth,facebookAuth)
router.get('/getFBData',getFBData)
// router.get('/getFBData',getFBPageData)


module.exports = router