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
    },
    goalStatus:{
        type:String,
        enum:['Expired','Achived','Pending']
    },
   createdDate:{
        type:Date,
        default:Date.now,
      required:true,
        immutable:true
    },
}, {
    timestamps: true
});



goalSchema.pre('validate', async function (next) {
    if ((Date.now() - this.createdDate) / (24 * 60 * 60 * 1000) > this.duration) {
        this.goalStatus = 'Expired';
    } else {
        this.goalStatus = 'Pending';
    }
    next();
});

const Goal = mongoose.model('Goal', goalSchema);




module.exports = Goal;  