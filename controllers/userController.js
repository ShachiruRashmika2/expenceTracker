const userModel=require('../models/userModel')
const resorceModel=require('../models/ResourceModels/resorceModel')
const transactionModel=require('../models/TransactionModels/transactionsModel')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { Types } = require('mongoose');


//Register New User
exports.regNewUsers= async(req,res)=>{

const {
name,
email,
password,
Type


}=req.body;

//Password Encryption
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


//User Login
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

//Get Profile
exports.getProfile=async(req,res)=>{
    const{_id,name,email,Type}=await userModel.findById(req.user._id);
    res.status(200).json({id:_id,name,email,Type});
}

//Delete Profile
exports.deleteProfile=async(req,res)=>{

    userModel.findByIdAndDelete(req.user._id).then(()=>{
        res.status(200).json({massage:"Profile Deleted Succssfully"});
    }
        
    ).catch((err)=>{
        res.status(400).json({massge:"Profile Deletion Failed"});
    })

}


//Update User
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

//Delete Users By Admin

exports.deleteUsersByAdmin=async(req,res,next)=>{

    const user_id=req.params.id;

    const userToBeDeleted= await userModel.findById(user_id);
     
    await userModel.findByIdAndDelete(user_id).then(()=>{

        res.status(200).json({massage:"User Deleted By an Admin"});
        req.recEmail=userToBeDeleted.email;
        req.sub="Account Deleted";
        req.msg="Your Account has been Deleted by an Admin";
        //next();


    }).catch((err)=>{

        res.status(400).json({massage:"Error While Updating",err});

    })



}

exports.genReport=async(req,res)=>{

try {
    let User;
    await userModel.findById(req.user._id).then((user) => {
        User = user;
    }).catch((err) => {
        return res.status(500).json({ message: "Error fetching user", error: err.message });
    });

    let transactionCount = 0;
    await transactionModel.transaction.countDocuments({ user: req.user._id }).then((count) => {
        transactionCount = count;
    }).catch((err) => {
        return res.status(500).json({ message: "Error counting transactions", error: err.message });
    });

    let resourceCount = 0;
    await resorceModel.countDocuments({ user: req.user._id }).then((count) => {
        resourceCount = count;
    }).catch((err) => {
        return res.status(500).json({ message: "Error counting resources", error: err.message });
    });

    let expenceCont = 0;
    await transactionModel.transaction.countDocuments({ user: req.user._id, type: "Expense" }).then((count) => {
        expenceCont = count;
    }).catch((err) => {
        return res.status(500).json({ message: "Error counting expenses", error: err.message });
    });

    let incomeCount = 0;
    await transactionModel.transaction.countDocuments({ user: req.user._id, type: "Income" }).then((count) => {
        incomeCount = count;
    }).catch((err) => {
        return res.status(500).json({ message: "Error counting income", error: err.message });
    });

    res.status(200).json({
        Name: User.name,
        Email: User.email,
        TotalTransactions: transactionCount,
        TotalResources: resourceCount,
        TotalExpences: expenceCont,
        TotalIncome: incomeCount,

    });
} catch (err) {
    res.status(500).json({ message: "Error generating report", error: err.message });
}




}