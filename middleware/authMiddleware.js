const jwt=require('jsonwebtoken');
const user=require('../models/userModel');


const protect=async(req,res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try{
        //get token
        token=req.headers.authorization.split('')[1];
        //verify
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //get user
        req.user=await user.findById(decoded._id).select('-password');

        next();
    
       }catch(err){
        console.log(err);
         res.status(400).json({massage:"Not Autherized"});

       }
    }
    if(!token){
        res.status(404).json({massage:"Not Autherized, NO Token"});
    }

}

module.exports={protect};