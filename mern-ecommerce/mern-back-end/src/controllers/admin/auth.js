const User = require("../../models/user")
exports.signup = async (req,res)=>{
    try {
        
        const che_user = await User.findOne({email:req.body.email})
        if(che_user){
            return res.status(400).send({error:"You already Registered"})
        }
        const {firstName,lastName,email,password,userName} =req.body
        const user = new User({firstName,lastName,email,password,userName,role:'admin'})
        await user.save().then(()=>{
            
        }).catch((error)=>{
            res.status(400).send(error._message)
        })
        const token = await user.generateAuthToken()
        res.send({
            user,token
        })
        
    } catch (error) {
        res.status(400).send()
    }
    // User.findOne({email:req.body.email}).exec(
    //     (error,user)=>{
    //         if(user) {
    //             return res.status(400).json({
    //                 message:"Admin Alread registered"
    //             })
    //         }
    //         const {firstName,lastName,email,password,userName} =req.body
    //         const _user = new User({firstName,lastName,email,password,userName,role:'admin'})
        
    //         _user.save((error,data)=>{
    //             if(error){
    //                 return res.status(400).json({
    //                     message:"Something Went wrong"
    //                 })
    //             }
    //             else if(data){
    //                 return res.status(201).json({
    //                     message:"Admin Created Successfully"
    //                 })
    //             }
    //         })
    //     })

}

exports.signin = async (req,res)=>{
   
     try {
    const user = await User.findByCredentials(req.body.email,req.body.password)
  
    if(user.role === 'admin'){
        const token = await user.generateAuthToken()
    const {_id,firstName,lastName,email,role,fullName} = user

    res.send({
        token,
        user:{
            _id,firstName,lastName,email,role,fullName
        }
    })
       
    }
        
    } catch (error) {

        res.status(400).send()
        
    }
}

exports.signout =  (req,res)=>{

    
    req.user.tokens = req.user.tokens.filter(tok => tok.token !== req.token)
    req.user.save((error,user)=>{
         if(error) return res.status(400).send()
         if(user){
             res.status(201).send(user)
         }
     })


}

exports.profile = async (req, res)=>{
    const user = req.user
    res.send({
        user
    })
    

}