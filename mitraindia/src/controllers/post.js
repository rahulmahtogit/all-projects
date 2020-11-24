const Post = require('../models/post')


exports.createPost = async (req,res)=>{
    const {userid,description,likeCount,tags,} = req.body
    const images = []
    const videos = []
    

    for (let upload of req.files){
      // Check for ext mp4 img
      images.push({imageurl:upload.key,imagelocation:upload.location})
    }
    const uploads = {images,videos}
    const post = new Post({userid,description,likeCount,tags,uploads})
    await post.save().then(()=>{res.send("Your post created Suceessfully")}).catch(()=>{res.status(400).send("Your post didn\'t created")})
   
}