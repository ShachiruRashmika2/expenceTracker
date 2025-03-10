const mongoose = require('mongoose');

const SavingsAccountSchema = new mongoose.Schema({
    accountType: {
        type: String,
        enum: ['Savings'],
        default: 'Savings',
        immutable: true
    },
    AccountNumber: {
        type: Number,
        required: [true, "Please enter the account number"],
        unique: true
    },
  
    bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank',
        required: [true, "Please enter the bank"]
    },
    category: {
        type: String,
        enum:[Funds],
        default: 'Funds',
        immutable: true
     
    },
})

const currentAccountSchema = new mongoose.Schema({

    accountType: {
        type: String,
        enum: ['Current'],
        default: 'Current',
        immutable: true
    },
    bank: {
        type: String,
        required: true
    },
 });

 const fixedAccountSchema = new mongoose.Schema({

    accountType: {
        type: String,
        enum: ['Fixed'],
        default: 'Fixed',
        immutable: true
    },
    bank: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
 
 });

 const savingsAccountModel = mongoose.model('SavingsAccount', SavingsAccountSchema);
 const currentAccountModel = mongoose.model('CurrentAccount', currentAccountSchema);
const fixedAccountModel = mongoose.model('FixedAccount', fixedAccountSchema);

module.exports = {savingsAccountModel, currentAccountModel, fixedAccountModel};