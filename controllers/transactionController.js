
const {reccuringTransacation,transaction}=require('../models/TransactionModels/transactionsModel');
const resourceModel=require('../models/ResourceModels/resorceModel');
const curruncyConverter=require('../utils/curruncyConverter');
const budgetModel=require('../models/budgetModel');
const noticationController=require('./notificationController');
const notificationModel = require('../models/notificationModel');






// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await transaction.find().select('-amount').exec();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTransactionsByTag = async (req, res) => {
    try {
        const transactions = await transaction.find().select('user tag').populate('user').exec();
        if (!transactions) {
            return res.status(404).json({ message: 'Transactions not found' });
        }
        res.status(200).json(transactions);
    }  catch (error) {
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
    let convertedAmount;
    if(curruncy==='LKR'){
        convertedAmount=amount;}
        else{
     convertedAmount= await curruncyConverter.ConvertCurrency(curruncy,'LKR',amount);
        }
    let newTransaction;

    const Resource = await resourceModel.findOne( {
        $and:[{user:req.user._id},{_id:resource}]
     });

   if(!Resource){
    return res.status(404).json({ message: 'Resource not found' });
   }


    if(frequencyType && Resource){

        if(frequencyType==='recurring'){

            newTransaction= new reccuringTransacation({

                user:req.user._id,
                amount:convertedAmount,
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
                amount:convertedAmount,
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

        noticationController.createNotification(req.user._id,"Transaction Susscessfully Created");
        resourceModel.findByIdAndUpdate(
            Resource._id,
            {balance:Resource.balance+convertedAmount},
          
          
            { new: true }
        ).then((updatedResource) => {
                if(updatedResource.budget){
                   budgetModel.findById(updatedResource.budget).then((budget) => {
                    if(budget.amount<updatedResource.balance){
                        noticationController.createNotification(req.user._id,"Budget Limit Exceeded");
                    }
                   })
 }



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
            return res.status(404).json({ message: 'Transaction not found' });
        }

    
        const Resource = await resourceModel.findById(deletedTransaction.resource);

        if (!Resource) {
            return res.status(404).json({ message: 'Resource not found',a:deletedTransaction.amount });
        }

        let bal;
        if (deletedTransaction.type === 'Income') {
            bal = Resource.balance - deletedTransaction.amount;
        } else if (deletedTransaction.type === 'Expense') {
            bal = Resource.balance + deletedTransaction.amount;
        } else {
            return res.status(400).json({ message: 'Invalid transaction type', type: deletedTransaction.type });
        }

        await resourceModel.findByIdAndUpdate(
            Resource._id,
            { balance: bal },
            { new: true }
        ).then(() => {
            console.log("Resource balance updated successfully", bal);
        })
        .catch(err => {
            console.error("Error while updating resource balance", err);
        });

        await transaction.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).json({ message: 'Transaction deleted successfully' ,amt:bal });
            noticationController.createNotification(req.user._id,"Transaction Susscessfully Deleted");
        }
       
        ).catch((err) => {
            res.status(400).json({ message: 'Error while deleting transaction', err });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
