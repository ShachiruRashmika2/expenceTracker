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
const resourceTypeRoute = require('./routes/resourceTypeRoutes');
const resourceRoute = require('./routes/resourceRoute');
const transactionCategoryRoute=require('./routes/TransactionRoutes/TransactionCategoryRoute');
const transactionRoute=require('./routes/TransactionRoutes/transactionRoute');
const goalRoute=require('./routes/goalRoute');
const budgetRoute=require('./routes/budgetRoute');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(port,()=>{console.log(`Server Started on port ${port}`)});

app.use('/1',getOneRoute);
app.use('/user',userRoute);
app.use('/accType',accountTypeRoute);
app.use('/bank',bankRoute);
app.use('/resourceType',resourceTypeRoute);
app.use('/resource',resourceRoute);
app.use('/transactionCat',transactionCategoryRoute);
app.use('/transaction',transactionRoute);
app.use('/goal',goalRoute);
app.use('/budget',budgetRoute);