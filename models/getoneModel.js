const mongoose=require('mongoose');

const getOneSchema=new mongoose.Schema({

   /* user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'

    },*/
    name:{
        type:String,
        require:[true,"plz enter a name"]
    
    },
    age:{type:Number}








});

module.exports=mongoose.model('getoneModel',getOneSchema);

