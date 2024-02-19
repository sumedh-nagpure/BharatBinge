const express = require('express');
const userController = require('./userController');

const userRouter = express.Router();

userRouter.get('/',userController.getAllUsers);
userRouter.post('/verifyLogin',userController.verifyLogin);
userRouter.post('/individual',   userController.verifyToken , userController.getUserById);
userRouter.post('/',   userController.createUser);
userRouter.post('/login',   userController.loginUser);
userRouter.post('/updateLikes',  userController.verifyToken , userController.updateLikes);
userRouter.post('/updateWatchlist',  userController.verifyToken , userController.updateWatchlist);
userRouter.post('/updateDislikes',  userController.verifyToken , userController.updateDislikes);
userRouter.put('/:id', userController.verifyToken ,  userController.updateUser);
userRouter.delete('/individual',  userController.verifyToken , userController.deleteUser);
userRouter.delete('/', userController.deleteAllUsers);

module.exports = userRouter;