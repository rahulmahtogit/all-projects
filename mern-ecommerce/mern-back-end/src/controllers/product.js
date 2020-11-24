const Product = require('../models/product')
const slugify = require('slugify')


exports.createProduct = async (req,res)=>{
    
    

const  {name,slug,price,quantity,description,offer,reviews,  category,createdBy } = req.body
    let productPictures=[]
     if(req.files.length >0){
        productPictures = req.files.map(file =>{
            return {img:file.filename}
                })
     }
     const product = new Product({
         name,
         slug:slugify(name),
         price,quantity,description,offer,productPictures,reviews,  category,createdBy:req.user._id

     })
     

     product.save((error,product)=>{
       if(error){
           res.status(400).send()
       }
       if(product){
           res.status(201).send(product)
       }
     })
     
   
}