const mongoose = require('mongoose');
const bankAccountModel = require('./bankAccountModel');

const accountTypeSchema = new mongoose.Schema({
    accountType: {
        type: String,
        enum: ['Savings', 'Current', 'Fixed','custom'],
        required: true
    },
    accountCreatedType: {
        type: String,
        enum: ['Builtin', 'Custom'],
        default: 'Builtin',
    },
    createdBy: {
        type: String,
        required: true,
        ref: 'user'
    }
 
})

const accountType = mongoose.model('accountType', accountTypeSchema);

const SavingsAccount=accountType.discriminator('Savings',bankAccountModel.savingsAccountSchema);
const CurrentAccount=accountType.discriminator('Current',bankAccountModel.currentAccountSchema);
const FixedAccount=accountType.discriminator('Fixed',bankAccountModel.fixedAccountSchema);

module.exports = {accountType, SavingsAccount, CurrentAccount, FixedAccount};