const mongoose = require('mongoose');

exports.customAccountSchema = new mongoose.Schema({

    accountType: {
        type: String,
        default: 'CustomAccount',
        required: [true, "Please enter the account type"]
    },
 
});
