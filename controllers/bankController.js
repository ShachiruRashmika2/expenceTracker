const bankModel = require('../models/ResourceModels/AccountTypeModels/bankModel');

exports.getAllBanks = async (req, res) => {
    const allBanks = await bankModel.find();
    res.status(200).json(allBanks);
}

exports.createBank = async (req, res) => {

    const newBank = new bankModel({

        bankName: req.body.bankName,
        ownership: req.body.bankBranch,
        fixedIntRate: req.body.fixedIntRate,
        savingsIntRate: req.body.savingsIntRate,
        currentIntRate: req.body.currentIntRate,
        monthlyCharge: req.body.monthlyCharge,
        bankMail: req.body.bankMail,

        
    })

    await newBank.save().then(() => {
        res.status(200).json({ massage: "Bank Created Succsesfully" })
    }).catch((err) => {
        res.status(400).json({ massage: "Error While Adding Bank", err })
    })
}

exports.deleteBank = async (req, res) => {
    const bank = await bankModel.findById(req.params.id);
    if (!bank) {
        return res.status(404).json({ message: 'Bank not found' });
    }
    await bank.remove();
    res.status(200).json({ message: 'Bank Deleted' });
}   

exports.updateBank = async (req, res) => {  
    const bank = await bankModel.findById(req.params.id);
    if (!bank) {
        return res.status(404).json({ message: 'Bank not found' });
    }            
    bank.bankName = req.body.bankName || bank.bankName;
    bank.ownership = req.body.ownership || bank.ownership;
    bank.fixedIntRate = req.body.fixedIntRate || bank.fixedIntRate;
    bank.savingsIntRate = req.body.savingsIntRate || bank.savingsIntRate;
    bank.currentIntRate = req.body.currentIntRate || bank.currentIntRate;
    bank.monthlyCharge = req.body.monthlyCharge || bank.monthlyCharge;
    bank.bankMail = req.body.bankMail || bank.bankMail;

    await bank.save().then(() => {
        res.status(200).json({ massage: "Bank Updated Succsesfully" })
    }).catch((err) => {
        res.status(400).json({ massage: "Error While Updating Bank", err })
    })
}       