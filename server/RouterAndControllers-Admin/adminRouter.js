const express = require('express');
const adminController = require('./adminController');

const adminRouter = express.Router();

adminRouter.get('/users',adminController.getAllUsers);
adminRouter.delete('/delete/:id',adminController.deleteUser);

module.exports = adminRouter;