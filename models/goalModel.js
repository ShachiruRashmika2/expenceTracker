const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'resource',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    goalName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;  