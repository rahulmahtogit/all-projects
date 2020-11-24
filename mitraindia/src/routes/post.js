const express = require('express')
const {tokenAuth} = require('../middleware/auth')
const {createPost} = require('../controllers/post')
const router = express.Router()
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const shortid = require('shortid')
const path = require('path')

var s3 = new aws.S3({accessKeyId: 'AKIAZSGQP56LNQRDFDE3',
secretAccessKey: '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',
Bucket: 'mitraindias3'
})

 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mitraindias3',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
})
 
router.post('/upload', upload.array('uploads'),createPost)

// var s3 = new aws.S3({accessKeyId: 'AKIAZSGQP56LNQRDFDE3',
// secretAccessKey: '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',
// Bucket: 'mitraindias3'
// })
 
// var upload  = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'mitraindias3', // Bucket Name
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(null, shortid.generate() + '-' + file.originalname)
//     }
//   }),
//   // fileFilter:
// })

// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //       cb(null, path.join(__dirname,'../uploads'))
// //     },
// //     filename: function (req, file, cb) {
// //       cb(null, shortid.generate() + '-' + file.originalname)
// //     }
// //   })
   
// // const upload = multer({ storage: storage })
// // upload.array('pictures')

// router.post('/user/createPost',upload.single('profileImage'),(req,res)=>{
//   res.send("hello")
// })


module.exports = router


 // if( error ){
    //  console.log( 'errors', error );
    //  res.json( { error: error } );
    // } 
    // else {
    //  // If File not found
    //  if( req.file === undefined ){
    //   console.log( 'Error: No File Selected!' );
    //   res.json( 'Error: No File Selected' );
    //  } 
    //  else {
    //   // If Success
    //   const imageName = req.file.key;
    //   const imageLocation = req.file.location;
    //   console.log(imageName)
    //   console.log(imageLocation)
    //   // Save the file name into database into profile modelres.json( {
    //   //  image: imageName,
    //   //  location: imageLocation
    //   } 
    //  }
    // })