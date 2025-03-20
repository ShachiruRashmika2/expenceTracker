const Budget = require('../models/budgetModel');


exports.createBudget = async (req, res) => {
    try {
        const {  name, amount,expDate } = req.body;

       
        const newBudget = new Budget({
            user:req.user._id,
            name,
            amount,
            expDate
        });

        const savedBudget = await newBudget.save();

      
        res.status(201).json(savedBudget);
    } catch (error) {
        res.status(500).json({ message: 'Error creating budget', error });
    }
};