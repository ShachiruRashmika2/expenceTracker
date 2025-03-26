const express=require('express');
const router = express.Router();
const {protect}=require('../middleware/authMiddleware');
const budgetController=require('../controllers/budgetController')


router.post('/create', protect,budgetController.createBudget);
router.get('/fetch', protect,budgetController.getMyBudgets);
module.exports = router;