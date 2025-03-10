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
    res.status(400).json({massage:'User Not found'});
}
else{
    if(user && (await bcrypt.compare(password,user.password)))
        {
            res.status(200).json({massage:'logged in Succesfully',user,token:genarateToken(user._id,user.Type)});
        }
    else{
        res.status(400).json({massage:'Invalid Password'}); 
}
}


}

//genarate token
const genarateToken=(id,type)=>{

    return jwt.sign({id,type},process.env.JWT_SECRET,{
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

exports.updateProfile=async(req,res)=>{

const prevUser=await userModel.findById(req.user._id);
let password;

 let {
    name,
    email,
    newPassword,
    newPasswordRepeat
 }=req.body;

 name=name??prevUser.name;
 email=email??prevUser.email;

if(newPassword){

if(!newPasswordRepeat){
    res.status(400).json({massage:"Please Repeat the Password"});
}
else{

    if(newPassword!==newPasswordRepeat){
        res.status(400).json({massage:"Passwords Do not Match"});
    }
    else{
        //pasword Encryption
        const salt=await bcrypt.genSalt(10);
        password=await bcrypt.hash(newPassword,salt);

    }
}
   

 }
 else{
     password=prevUser.password;
 }

if(!name){
    name=prevUser.name;
}
if(!email){
    email=prevUser.email;   
}

 if(!prevUser){
    res.status(404).json({massage:"USer Does Not Exists"});
 }
else{

    const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        { name, email, password },
        { new: true } 
    ).then((updatedUser)=>{
        res.status(200).json({massage:"User Updated Succsesfully",updatedUser});
    }).catch((err)=>{

        res.status(400).json({massage:"Updation failed",err})
    })

       
}



}