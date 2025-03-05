const express = require('express');
const router = express.Router();


router.get('/api/getone',(req,res)=>{

    res.send("Get one Modified");
});

module.exports=router;