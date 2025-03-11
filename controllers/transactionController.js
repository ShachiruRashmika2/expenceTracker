
const {reccuringTransacation,transaction}=require('../models/TransactionModels/transactionsModel')

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await transaction.find().exec();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get User's All Transactions
exports.getAllUserTransactions=async(req,res)=>{

await transaction.findById(req.user._id).then((trans)=>{
    if (!trans) {
        return res.status(404).json({ message: 'Transactions not found' });
    }
    else{
        res.status(200).json({massage:"Transaction fetched Succsessfully",trans});
    }

}).catch((err)=>{
    res.status(500).json({ message:"Error While Fetching",err });

});


}
// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
   
        await Transaction.findById(req.params.id).then((trans)=>{
            if (!trans) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            else{
                res.status(200).json({massage:"Transaction Fetched Succsessfully",trans});
            }
        }).catch((err)=>{
            res.status(500).json({ message:"Error While Fetching",err });

        });
};

// Create a new transaction

exports.createTransaction = async (req, res) => {
  
    const{
        amount,
        category,
        resource,
        frequencyType,
        tag,
        frequency
    }=req.body;
    
    let newTransaction;
    if(frequencyType){

        if(frequencyType==='recurring'){

            newTransaction= new reccuringTransacation({

                user:req.user._id,
                amount,
                category,
                resource,
                frequencyType,
                tag,
                frequency



            })

        }
        else if(frequencyType==='onetime'){

            newTransaction=  new transaction({

                user:req.user._id,
                amount,
                category,
                resource,
                frequencyType,
                tag,
           



            })


        }


    }
    else{


        res.status(404).json({massage:" freq Type Not found"})

    }

    await newTransaction.save().then((trans)=>{
        res.status(200).json({massage:"transaction Recoded Succsessfully",trans});
    }).catch((err)=>{
        res.status(400).json({massage:"Error While making record",err})

    })


};

// Update an existing transaction
exports.updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
