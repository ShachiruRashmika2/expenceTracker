const mongoose=require('mongoose');
const user=require('../userModel');


const resourceTypeSchema=new mongoose.Schema({
  
    resourceName:{
        type:String,
        required:[true,"Plz enter a Resource name"]
    },
    accountType:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'accountType'
       
    },  
    resourceCreatedType:{
        type:String,
        enum:['Builtin','Custom'],
        default:'Builtin',
    
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        
    }

 


})

resourceTypeSchema.pre('save',async function(next){

    try{

    const User=await user.findById(this.createdBy);

    //Set created Type
    if(User.Type==='Admin'){
        this.resourceCreatedType='Builtin';
    }
    else if(User.Type==='User'){
        this.resourceCreatedType='Custom';
    }




    next();}
    catch(err){
        console.log(err);
    }
})

const resourceType=mongoose.model('resourceType',resourceTypeSchema);

module.exports=resourceType;