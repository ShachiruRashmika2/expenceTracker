const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Plz enter a name"]
    },
    email:{
        type:String,
        required:[true,"plz Enter an email"]
    },
    password:{
        type:String,
        required:[true,"plz enter a password"]
    }
},
   {
        timestamps:true
  }
)

module.exports=mongoose.model('user',userSchema);