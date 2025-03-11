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
      
   },  
   resourceType : {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'resourceType'
   },
   defaultCurruncy:{

    type:String,
    required:[true,"Enter Curruncy"],
    default:'LKR'


   }


})

resourceSchema.pre('save', async function (next) {
    let dayDifference = (Date.now() - this.startDate.getTime()) / (1000 * 60 * 60 * 24);
    this.resourceState = dayDifference > 150 ? 'Inactive' : 'Active';
    this.balanceStatus = this.balance < 0 ? 'Overdrawn' : 'Credit';
    next();
});

resourceSchema.pre('findOneAndUpdate', async function (next) {
    let update = this.getUpdate();

    
    if (update.startDate) {
        let dayDifference = (Date.now() - new Date(update.startDate).getTime()) / (1000 * 60 * 60 * 24);
        update.resourceState = dayDifference > 150 ? 'Inactive' : 'Active';
    }
    
    if (update.balance !== undefined) {
        update.balanceStatus = update.balance < 0 ? 'Overdrawn' : 'Credit';
    }

 

    this.setUpdate(update);
    next();
});

const resource=mongoose.model('resource',resourceSchema);

module.exports=resource;