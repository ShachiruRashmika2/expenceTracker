const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { Types } = require('mongoose');

exports.regNewUsers= async(req,res)=>{

const {
name,
email,
password,
Type


}=req.body;

//pasword Encryption
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);

const newUser=new userModel({
 
    name,
    email,
    password:hashedPassword,
    Type
  
})

await newUser.save().then(()=>{
    res.status(200).json({massage:"User Created Succsesfully",token:genarateToken(newUser._id)})
}).catch((err)=>{

    res.status(400).json({massage:"Error While Adding User",err})
})


}

exports.getAllUsers=async(req,res)=>{

    const allUsers=await userModel.find();
    res.status(200).json(allUsers);
}

exports.loginUser=async(req,res)=>{


const{
    email,
    password
}=req.body;

const user= await userModel.findOne({email:email});

if(!user){
    res.status(400).json({massage:'User Not found or Invalid credentials'})
}
else if(user && (await bcrypt.compare(password,user.password))){
    res.status(200).json({massage:'logged in Succesfully',user,token:genarateToken(user._id)});
}



}

//genarate token
const genarateToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

exports.getProfile=async(req,res)=>{
    const{_id,name,email,Type}=await userModel.findById(req.user._id);
    res.status(200).json({id:_id,name,email,Type});
}

exports.deleteProfile=async(req,res)=>{

    userModel.findByIdAndDelete(req.user._id).then(()=>{
        res.status(200).json({massage:"Profile Deleted Succssfully"});
    }
        
    ).catch((err)=>{
        res.status(400).json({massge:"Profile Deletion Failed"});
    })

}