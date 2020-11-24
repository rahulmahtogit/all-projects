const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    description:{
        type:String
    },
    likeCount :{
        type:String
    },
    tags:[{type:String
    }],
    uploads:{
        images:[{
            imageurl:{
            type:String},
            imagelocation:{
                type:String}

        }],
        videos:[{
            videourl:{
                type:String,   
            },
            videolocation:{
                type:String
            }
        }]

    }

})

const Post = mongoose.model('Post',postSchema)

module.exports = Post