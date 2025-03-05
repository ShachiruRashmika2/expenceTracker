const express = require('express');
const dotenv=require('dotenv');

const port = process.env.PORT||3000;


//importing routes
const getOneRoute=require('./routes/getOneRoute');

const app = express();

app.listen(port,()=>{console.log(`Server Started on port ${port}`)});

app.use('/1',getOneRoute);