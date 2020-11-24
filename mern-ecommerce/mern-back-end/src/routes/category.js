const express = require('express')
const {addCategory,getCategories} = require('../controllers/category')
const {authen, adminMiddleware} = require('../middleware/authen')
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



router.post('/category/create',authen,adminMiddleware,upload.single('categoryImage'), addCategory)
router.get('/category/getcategory',getCategories)

module.exports=router
