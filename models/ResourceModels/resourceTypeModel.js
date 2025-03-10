const mongoose=require('mongoose');


const resourceTypeSchema=new mongoose.Schema({
  
    resourceName:{
        type:String,
        required:[true,"Plz enter a Account name"]
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
        type:String,
        required:true,
        ref:'user'
    }

 


})

resourceTypeSchema.pre('save',async(next)=>{
    //Set created Type
    if(this.createdBy==='Admin'){
        this.resourceCreatedType='Builtin';
    }
    else if(this.createdBy==='User'){
        this.resourceCreatedType='Custom';
    }




    next();
})

const resourceType=mongoose.model('resourceType',resourceTypeSchema);

module.exports=resourceType;