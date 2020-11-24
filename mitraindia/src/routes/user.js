const express = require('express')
const router = express.Router()
const {tokenAuth} = require('../middleware/auth')
const session = require('express-session')

const {signup,emailver,emailExists,forgotPassword,signin,signout} = require('../controllers/user')

router.use(session({
    secret: 'mitruindia',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60,
      secure: false }
  }))

router.post('/signup',signup)
// This API hits when user click on link sent over the email
router.get('/emailverification/:id',emailver)
router.post('/emailExists',emailExists)
router.post('/forgotPassword',forgotPassword)
router.post('/signin',signin)
router.post('/signout',tokenAuth,signout)




router.get('/testingg',(req,res)=>{
    res.send("hello")
})



module.exports = router