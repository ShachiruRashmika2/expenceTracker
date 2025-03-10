const jwt=require('jsonwebtoken');
const user=require('../models/userModel');


const protect=async(req,res,next)=>{

    let token;
  

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try{
        //get token
        token=req.headers.authorization.split(' ')[1];
        //verify
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //get user
       req.user=await user.findById(decoded.id);
        next();
    
       }catch(err){
        console.log(err);
         res.status(400).json({massage:"Not Autherized",err});

       }
    }
    if(!token){
        res.status(404).json({massage:"Not Autherized, NO Token"});
    }

}
const privilageAdmin=async(req,res,next)=>{

    let token;
  
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            //get token
        token=req.headers.authorization.split(' ')[1];
        //verify
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //get user
        if(decoded.type==='Admin'){
            req.user=await user.findById(decoded.id);
            next();
        }
        else{
            res.status(400).json({massage:"user is not an Admin",tpe:decoded.type});  
         }
       
        

        }catch(err){
            res.status(400).json({massage:"Not Autherized",err});
        }
    }
    if(!token){
        res.status(404).json({massage:"Not Autherized, NO Token"});
    }


}

module.exports={protect,privilageAdmin};