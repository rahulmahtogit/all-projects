const express = require('express')
const Cart = require('../models/cart')
const {addItemToCart} = require('../controllers/cart')
const {authen,userMiddleware} = require('../middleware/authen')
const router = express.Router()


router.post('/user/cart/add-to-cart',authen,userMiddleware,addItemToCart)

module.exports=router