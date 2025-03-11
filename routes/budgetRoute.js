const express=require('express');
const router = express.Router();
const {protect}=require('../middleware/authMiddleware');
const budgt=require('../controllers/budgetController')
router.post('/create', protect,budgt.createBudget);

module.exports = router;