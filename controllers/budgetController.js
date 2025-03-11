const Budget = require('../models/budgetModel');


exports.createBudget = async (req, res) => {
    try {
        const { user, name, amount } = req.body;

       
        const newBudget = new Budget({
            user:req.user._id,
            name,
            amount
        });

        const savedBudget = await newBudget.save();

      
        res.status(201).json(savedBudget);
    } catch (error) {
        res.status(500).json({ message: 'Error creating budget', error });
    }
};