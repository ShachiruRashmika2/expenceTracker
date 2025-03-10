const mongoose = require('mongoose');

exports.WalletSchema = new mongoose.Schema({

    accountName: {
        type: String,
        enum: ['MYWallet'],
        default: 'MYWallet',
        immutable: true
    },
});


