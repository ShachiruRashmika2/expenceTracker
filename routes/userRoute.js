const express=require('express');
const Router=express.Router();

const userController=require('../controllers/userController')

Router.post('/signup',userController.regNewUsers);
Router.get('/all',userController.getAllUsers);
Router.post("/login",userController.loginUser);

module.exports=Router;

