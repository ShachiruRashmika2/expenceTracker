const TransactionCategory = require('../models/TransactionModels/transactionCategoryModel');

// Get all transaction types
exports.getAllTransactionTypes = async (req, res) => {
    try {
        const transactionTypes = await TransactionCategory.find().exec();
        res.status(200).json(transactionTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single transaction type by ID
exports.getTransactionTypeById = async (req, res) => {
    try {
        const transactionType = await TransactionCategory.findById(req.params.id);
        if (!transactionType) {
            return res.status(404).json({ message: 'Transaction type not found' });
        }
        res.status(200).json(transactionType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new transaction type
exports.createTransactionType = async (req, res) => {
    const newTransactionCategory = new TransactionCategory({
        createdBy:req.user._id,
        categoryName:req.body.categoryName
        

    });

 
    await newTransactionCategory.save().then((newTransactionType)=>{
        res.status(201).json(newTransactionType);
    }).catch ((err)=>{  
        res.status(400).json({ message:'error while creating',err});
    }) 
      
    
};



// Delete a transaction type
exports.deleteTransactionCategory = async (req, res) => {
    try {
        const transactionType = await TransactionCategory.findById(req.params.id);
        if (!transactionType) {
            return res.status(404).json({ message: 'Transaction type not found' });
        }

        await transactionType.remove();
        res.status(200).json({ message: 'Transaction type deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};