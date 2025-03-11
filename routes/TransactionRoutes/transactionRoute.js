const express=require('express');
const transactionController=require('../../controllers/transactionController.js');
const authMiddleware=require('../../middleware/authMiddleware.js');
const { transaction } = require('../../models/TransactionModels/transactionsModel.js');


const router=express.Router();

router.post('/createNew',authMiddleware.protect,transactionController.createTransaction);
router.get('/getmyAll',authMiddleware.protect,transactionController.getAllUserTransactions);
router.delete('/:id',authMiddleware.protect,transactionController.deleteTransaction);
router.put('/:id',authMiddleware.protect,transactionController.updateTransaction);



module.exports=router;

