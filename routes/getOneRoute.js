const express = require('express');
const router = express.Router();
const getOneController=require('../controllers/getOneController');

router.get('/api/getone',getOneController.getOne);

module.exports=router;