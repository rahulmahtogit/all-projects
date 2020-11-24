const express = require('express')
const {createProduct} = require('../controllers/product')
const {authen,adminMiddleware} = require('../middleware/authen')
const router = express.Router()
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname )
    }
  })

  const upload = multer({
    storage:storage
})


router.post('/product/create',authen,adminMiddleware,upload.array('productPicture'), createProduct)


module.exports = router 