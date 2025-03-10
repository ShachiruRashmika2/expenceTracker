const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({

    bankName: {
        type: String,
        required: true
    },
    ownership: {
        type: String,
        enum: ['Public', 'Private'],
        default: 'Public',
        required: true
    },
    fixedIntRate:{
        type: Number,
        required:[true,"plz enter the fixed interest rate"]
    },
    savingsIntRate:{
        type: Number,
        required:[true,"plz enter the savings interest rate"]
    },
    monthlyCharge:{
        type: Number,
        required:[true,"plz enter the monthly charge"]
    },
    bankMail: {
        type: String,
        required: [true, "Please enter the email"],
    },
   

});

const bankModel = mongoose.model('bank', bankSchema);
module.exports = bankModel;