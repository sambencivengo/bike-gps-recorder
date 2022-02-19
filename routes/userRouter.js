const express = require('express');
const userRouter = express.Router();

const {
	registerUser,
	userLogin,
	cookieChecker,
} = require('../controllers/userController');

userRouter.route('/register').get(cookieChecker).post(registerUser);
userRouter.route('/login').post(userLogin);

module.exports = userRouter;
