const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    expDate:{type:Date,required:[true,'Plz set expiriation Date']},
    duration:{type:Number,required:[true,'Plz set duration ']},
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now }
   
});

budgetSchema.pre('validate',async function(next) {
    if(!this.createdAt){
        this.createdAt=Date.now;
    }
    this.duration=Math.round((this.expDate-this.createdAt)/(24*60*60*1000));
    next();
})

budgetSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;