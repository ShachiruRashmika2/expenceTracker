const mongoose = require('mongoose');


const transactionCategorySchema = new mongoose.Schema({ 
    categoryName: {
        type: String,
        required: [true, "Please enter the Category Name"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
});

const transactionCategory = mongoose.model('transactionCategory', transactionCategorySchema);

module.exports = transactionCategory;