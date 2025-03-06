const userModel=require('../models/userModel')

exports.regNewUsers= async(req,res)=>{

const newUser=new userModel({
name:req.body.name,
email:req.body.email,
password:req.body.password


})

await newUser.save().then(()=>{
    res.status(200).json({massage:"User Created Succsesfully"})
}).catch((err)=>{

    res.status(400).json({massage:"Error While Adding User",err})
})


}

exports.getAllUsers=async(req,res)=>{

    const allUsers=await userModel.find();
    res.status(200).json(allUsers);
}