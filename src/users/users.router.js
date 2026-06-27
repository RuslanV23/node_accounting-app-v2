const { Router } = require('express');

const BaseService = require('../utils/baseService');
const BaseController = require('../utils/baseController');

const userService = new BaseService();

const userController = new BaseController(userService);

const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.createOne);
userRouter.get('/:paramsId', userController.getOne);
userRouter.delete('/:paramsId', userController.deleteOne);
userRouter.patch('/:paramsId', userController.updateOne);

module.exports = { userRouter, userService };
