const Cart = require('../models/cart')

exports.addItemToCart = async (req,res)=>{
    Cart.findOne({user:req.user._id}).exec((error,cart)=>{
        if(error) return res.status(400).send({error})
        if(cart){
            // if duplicate Cart  exists then update cart by quantity
            const item = cart.cartItems.find(cartItem => cartItem.product == req.body.cartItems.product)
            let filter,update;
            
            if(item){
                filter = {user:req.user._id,"cartItems.product":req.body.cartItems.product}
                update= {"$set":{"cartItems.$": {
                    ...req.body.cartItems,quantity:item.quantity + req.body.cartItems.quantity
                }}}
      
                
                Cart.findOneAndUpdate(filter,update
                ).exec((error,_ca)=>{
                    if(error){
                       return res.status(400).send({error})
                    }
                    if(_ca){
                       res.status(201).send({cart:_ca})
                    }
                })

            }else{
                filter= {user:req.user._id},
                update= {"$push" :{"cartItems":req.body.cartItems}}
                Cart.findOneAndUpdate(filter,update).exec((error,_cart)=>{
                    if(error){
                       return res.status(400).send({error})
                    }
                    if(_cart){
                       res.status(201).send({cart:_cart})
                    }
                })
            }
            
         }
         else{
              // if cart doesnot exist then create a new cart
        const cart = new Cart({
            user:req.user._id,
            cartItems:[req.body.cartItems]
        })
        cart.save((error,cart)=>{
            if(error) return  res.status(400).send({error})
            if(cart){
                res.status(201).send({cart})
             }
            
        })
         }
    })

}



