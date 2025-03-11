const mongoose = require('mongoose');
const account = require('../ResourceModels/resourceTypeModel');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    amount: {
        type: Number,
        required: [true, "Please enter the amount"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the category"],
        ref: 'transactionCategory'
    },
    type: {
        type: String,   
        enum: ['Income', 'Expense'],
        required: [true, "Please enter the type"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the account"],
        ref: 'account'
    },
    frequencyType: {
        type: String,
        enum: ['recurring'],
        required:[true,'Please enter a Frequancy']
    },
    tag:{
        type:String,

    }
    
},timeStramps = true);

const transaction = mongoose.model('transaction', transactionSchema);

const recurringTransactionSchema=mongoose.Schema({

    frequency:{
        type:String,
        enum:['Monthly','Anuualy','Weekly','Daily'],
        default:'Monthly'
    },
    occuranceDate:{
        type:Date,
        default:Date.now,
        required:[true,'Enter a Date']
    }

})

const reccuringTransacation=transaction.discriminator('recurringTransaction',recurringTransactionSchema);

module.exports={reccuringTransacation,transaction};
