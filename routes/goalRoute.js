const express=require('express');
const goalController=require('../controllers/goalController');
const {protect}=require('../middleware/authMiddleware')
const router=express.Router();

router.post('/create',protect,goalController.createGoal);




module.exports=router;

