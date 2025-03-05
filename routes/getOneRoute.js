const express = require('express');
const router = express.Router();
const getOneController=require('../controllers/getOneController');

router.get('/api/getone',getOneController.getOne);
router.post('/api/getone',getOneController.makeOne);
router.put('/api/getone/:id',getOneController.updateOne);
router.delete('/api/getone/:id',getOneController.deleteOne);

module.exports=router;