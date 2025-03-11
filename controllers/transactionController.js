
const {reccuringTransacation,transaction}=require('../models/TransactionModels/transactionsModel');
const resourceModel=require('../models/ResourceModels/resorceModel');
const currencyConverter=require('money');
currencyConverter.base = "USD";
currencyConverter.rates = {
    "LKR": 200.5,
    // Add other currencies here
};


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

await transaction.find({user:req.user._id}).populate(
    [
        {path:'user',select:'name'},
        {path:'category',select:'categoryName'},
        {path:'resource',select:'balance resourceType',populate: { path: 'resourceType', select: 'resourceName' }}
      


]

).then((trans)=>{
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
   
        await transaction.findById(req.params.id).then((trans)=>{
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
        frequency,
        curruncy
    }=req.body;
    const convertedAmount= currencyConverter.convert(amount,{from:curruncy,to:"LKR"});

    const Resource = await resourceModel.findOne({ user: req.user._id });
   


    let newTransaction;
    if(frequencyType && Resource){

        if(frequencyType==='recurring'){

            newTransaction= new reccuringTransacation({

                user:req.user._id,
                amount,
                category,
                resource,
                frequencyType,
                tag,
                frequency,
                curruncy



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
                curruncy
           



            })


        }


    }
    else{


        res.status(404).json({massage:" freq Type Not found"})

    }

    newTransaction.save().then((trans) => {
        resourceModel.findByIdAndUpdate(
            Resource._id,
            {balance:Resource.balance+amount},
          
          
            { new: true }
        )
        .then(updatedResource => {
            res.status(200).json({
                message: "Transaction recorded successfully",
                convertedAmount,
                a:Resource.balance,
                trans,
                msg: "Record balance updated successfully",
                
               
            });
        })
        .catch(err => {
            res.status(400).json({ message: "Error while updating record balance", err ,a:Resource._id});
        });
    })
    .catch(err => {
        res.status(400).json({ message: "Error while making record", err });
    });



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
        const deletedTransaction = await transaction.findById(req.params.id);
        if (!deletedTransaction) {
           res.status(404).json({ message: 'Transaction not found' });
        }
        else{
            if(deletedTransaction.user._id===req.user._id){
                await deletedTransaction.remove().then(()=>{
                    res.status(200).json({massage:"Deleted Succsesfully"})
                }).catch((err)=>{
                    res.status(400).json({massage:"Error while deliting",err})
                })
            }

        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
