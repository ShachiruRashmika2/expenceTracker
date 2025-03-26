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

exports.getMyBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user._id }).populate('user', 'name');
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budgets', error });
    }
}