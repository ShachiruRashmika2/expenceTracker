const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

budgetSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;