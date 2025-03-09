const express=require('express');
const Router=express.Router();


const userController=require('../controllers/userController');
const {protect}=require('../middleware/authMiddleware');


Router.post('/signup',userController.regNewUsers);
Router.get('/all',userController.getAllUsers);
Router.post("/login",userController.loginUser);
Router.get('/profile',protect,userController.getProfile);
Router.delete('/profile/delete',protect,userController.deleteProfile);
Router.put('/profile/update',protect,userController.updateProfile);

module.exports=Router;

