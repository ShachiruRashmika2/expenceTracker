const express = require('express');
const dotenv=require('dotenv').config();

const port = process.env.PORT||3000;
const dbConnect=require('./config/dbConnect');
dbConnect();

//importing routes
const getOneRoute=require('./routes/getOneRoute');
const userRoute=require('./routes/userRoute');
const accountTypeRoute = require('./routes/accountTypeRoutes/accountTypeRoute');
const bankRoute = require('./routes/accountTypeRoutes/bankRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(port,()=>{console.log(`Server Started on port ${port}`)});

app.use('/1',getOneRoute);
app.use('/user',userRoute);
app.use('/accType',accountTypeRoute);
app.use('/bank',bankRoute);