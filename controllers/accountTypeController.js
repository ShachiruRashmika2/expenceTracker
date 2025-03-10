const {CustomAccount,wallet,SavingsAccount,CurrentAccount,FixedAccount,accountType} = require('../models/ResourceModels/accountTypeModel');

exports.getAllAccountTypes = async (req, res) => {
    const allAccountTypes = await accountType.find().populate('bank', 'bankName').populate('createdBy', 'name');
    res.status(200).json(allAccountTypes);
}


exports.createAccountType = async (req, res) => {

    let newAccountType;
    switch(req.body.accountType){
        case 'Savings':
            
            newAccountType = new SavingsAccount({
                accountType: req.body.accountType,
                createdBy: req.user._id,
                AccountNumber: req.body.AccountNumber,
                bank: req.body.bank,  
        
            })
            break;
        case 'Current':
            newAccountType = new CurrentAccount({
                accountType: req.body.accountType,
                createdBy: req.user._id,
                AccountNumber: req.body.AccountNumber,
                bank: req.body.bank,  
        
            })
            break;
        case 'Fixed':
            newAccountType = new FixedAccount({
                accountType: req.body.accountType,
                createdBy: req.user._id,
                AccountNumber: req.body.AccountNumber,
                bank: req.body.bank,  
                duration: req.body.duration,
        
            })
            break;
        case 'Wallet':
            newAccountType = new wallet({

                
            accountType: req.body.accountType,
             createdBy: req.user._id,
        
            })
            break;
        case 'Custom':
            newAccountType = new CustomAccount({
                accountType: req.body.accountType,
                createdBy: req.user._id,
        
            })
            break;
        default:
            res.status(400).json({massage:"Account Type Not Found"})
    }


    await newAccountType.save().then(() => {
        res.status(200).json({ massage: "Account Type Created Succsesfully" })
    }).catch((err) => {
        res.status(400).json({ massage: "Error While Adding Account Type", err })
    })
}