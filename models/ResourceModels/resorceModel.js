const mongoose = require('mongoose');
const resourceType = require('./resourceTypeModel');
const BudgetModel = require('../budgetModel');

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
       required:[true,'Enter Resource State']
   },
   balanceStatus:{
       type:String,
       enum:['Credit','Overdrawn','Exceeded','Not-Exceeded'],
       default:'Credit',
       required:[true,'Enter Balance Status']
      
   },  
   resourceType : {
       type: mongoose.Schema.Types.ObjectId,
       required: [true, "Please enter the resource type"],
       ref: 'resourceType'
   },
   defaultCurruncy:{

    type:String,
    required:[true,"Enter Curruncy"],
    default:'LKR'


   },
   budget:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Budget',
  

   }


})

resourceSchema.pre('save', async function (next) {
    let dayDifference = (Date.now() - this.startDate.getTime()) / (1000 * 60 * 60 * 24);
    this.resourceState = dayDifference > 150 ? 'Inactive' : 'Active';
   if(this.budget && (this.balance<0)){

        await BudgetModel.find(this.budget).then((bgt)=>{

            this.balanceStatus=(Math.abs(this.balance))<bgt.amount?'Not-Exceeded':"Exceeded"
            next();
        }).catch((err)=>{

            console.log(err);

        })  

        



    }
    else if(!this.budget && this.balance){
    this.balanceStatus = this.balance < 0 ? 'Overdrawn' : 'Credit';
   
    }
    next();
    
});

resourceSchema.pre('findOneAndUpdate', async function (next) {
    let update = this.getUpdate();

    
    if (update.startDate) {
        let dayDifference = (Date.now() - new Date(update.startDate).getTime()) / (1000 * 60 * 60 * 24);
        update.resourceState = dayDifference > 150 ? 'Inactive' : 'Active';
    }
    
    const query = this.getQuery();
    const currentDocument = await this.model.findOne(query);

    if (update.balance !== undefined && !currentDocument.budget && !update.budget) {
        update.balanceStatus = update.balance < 0 ? 'Overdrawn' : 'Credit';
    } else if (update.balance !== undefined && currentDocument.budget && !update.budget) {
        await BudgetModel.findById(currentDocument.budget).then((bgt) => {
            update.balanceStatus = Math.abs(update.balance) < bgt.amount ? 'Not-Exceeded' : 'Exceeded';
        }).catch((err) => {
            console.log(err);
        });
    } else if (update.balance !== undefined && !currentDocument.budget && update.budget) {
        await BudgetModel.findById(update.budget).then((bgt) => {
            update.balanceStatus = Math.abs(update.balance) < bgt.amount ? 'Not-Exceeded' : 'Exceeded';
        }).catch((err) => {
            console.log(err);
        });
    }

 

    this.setUpdate(update);
    next();
});


const resource=mongoose.model('resource',resourceSchema);

module.exports=resource;