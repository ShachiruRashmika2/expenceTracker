const mongoose = require('mongoose');
const bankAccountModel = require('./AccountTypeModels/bankAccountModel');
const WalletModel = require('./AccountTypeModels/walletModel');
const customAccount = require('./AccountTypeModels/customAccount');

const accountTypeSchema = new mongoose.Schema({
    accountType: {
        type: String,
        enum: ['Savings', 'Current', 'Fixed','custom','Wallet'],
        required: true
    },
   
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
 
})

const accountType = mongoose.model('accountType', accountTypeSchema);

const SavingsAccount=accountType.discriminator('Savings',bankAccountModel.SavingsAccountSchema);
const CurrentAccount=accountType.discriminator('Current',bankAccountModel.currentAccountSchema);
const FixedAccount=accountType.discriminator('Fixed',bankAccountModel.fixedAccountSchema);
const wallet=accountType.discriminator('Wallet',WalletModel.WalletSchema);
const CustomAccount=accountType.discriminator('custom',customAccount.customAccountSchema);

module.exports={accountType,SavingsAccount,CurrentAccount,FixedAccount,wallet,CustomAccount};