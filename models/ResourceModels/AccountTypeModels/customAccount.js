const mongoose = require('mongoose');

exports.customAccountSchema = new mongoose.Schema({

    accountType: {
        type: String,
        default: 'CustomAccount',
        required: [true, "Please enter the account type"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Please enter the user"]
    },
});
