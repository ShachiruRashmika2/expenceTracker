const express=require('express');
const transactionController=require('../../controllers/transactionController.js');
const authMiddleware=require('../../middleware/authMiddleware.js');


const router=express.Router();

router.post('/createNew',authMiddleware.protect,transactionController.createTransaction);
router.get('/getmyAll',authMiddleware.protect,transactionController.getAllUserTransactions);




module.exports=router;

