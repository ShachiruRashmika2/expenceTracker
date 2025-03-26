const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Plz enter a Name"]
    },
    email:{
        type:String,
        required:[true,"plz Enter an email"]
    },
    password:{
        type:String,
        required:[true,"plz enter a password"]
    },
    Type:{
        type:String,
        enum:['Admin','User'],
        default:'User',
        required:[true,"Plz Set The Type"]
    }
},
   {
        timestamps:true
  }
)

module.exports=mongoose.model('user',userSchema);