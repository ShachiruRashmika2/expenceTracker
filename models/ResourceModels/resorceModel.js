const mongoose = require('mongoose');
const resourceType = require('./resourceTypeModel');

const resourceSchema = new mongoose.Schema({

   user:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'user',
       unique:[true,'User already has a resource']


   },
  startDate:{
       type:Date,
       default:Date.now,
     required:true,
       immutable:true
   },
   balance:{
       type:Number,
       required:true,
       default:0
   },
   resourceState:{
       type:String,
       enum:['Active','Inactive'],
       default:'Active',
       required:true
   },
   balanceStatus:{
       type:String,
       enum:['Credit','Overdrawn'],
       default:'Credit',
       required:true
      
   },  resourceType : {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'resourceType'
   }

})

resourceSchema.pre('save',async(next)=>{
    
    //Set resourceState
    let daydiference;
    if(this.startDate===Date.now()){
       daydiference=1;
    }
    else{
         daydiference=[Date.now()-this.startDate]/(1000*60*60*24);
    }
    
    if(daydiference>150 ){
        this.resourceState='Inactive';
    }
    else{
        this.resourceState='Active';
    }
    //set balanceStatus
    if(this.balance<0){
        this.balanceStatus='Overdrawn';
    }
    else{
        this.balanceStatus='Credit';
    }

})

const resource=mongoose.model('resource',resourceSchema);

module.exports=resource;