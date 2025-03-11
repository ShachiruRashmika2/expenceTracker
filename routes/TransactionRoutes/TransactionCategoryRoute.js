const express=require('express');
const transactionCategoryController=require('../../controllers/transactionCategoryController');
const authMiddleware=require('../../middleware/authMiddleware');

const router=express.Router();

router.post('/addnew',authMiddleware.privilageAdmin,transactionCategoryController.createTransactionType);
router.get('/getAll',transactionCategoryController.getAllTransactionTypes);

module.exports=router;