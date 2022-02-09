const express = require('express');
const userRouter = express.Router();

const { registerUser, userLogin } = require('../controllers/userController');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(userLogin);

module.exports = userRouter;
