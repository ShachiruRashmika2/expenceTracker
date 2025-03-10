const mongoose = require('mongoose');
const account = require('../ResourceModels/resourceTypeModel');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'account'
    }
});