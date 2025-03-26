const express=require('express');
const Router=express.Router();


const userController=require('../controllers/userController');
const {protect,privilageAdmin}=require('../middleware/authMiddleware');
const {emailService}=require('../middleware/emailService');

Router.post('/signup',userController.regNewUsers);
Router.post("/login",userController.loginUser);
Router.get('/profile',protect,userController.getProfile);
Router.delete('/profile/delete',protect,userController.deleteProfile);
Router.put('/profile/update',protect,userController.updateProfile);


Router.get('/admin/all',privilageAdmin,userController.getAllUsers);
Router.delete('/admin/delete/:id',privilageAdmin,userController.deleteUsersByAdmin/*,emailService.sendEmail*/);
module.exports=Router;

