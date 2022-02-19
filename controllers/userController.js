const jwt = require('jsonwebtoken');
const User = require('../models/user');
const handleValidationError = require('../errors/validation');
const bcrypt = require('bcrypt');
const createToken = require('../middleware/createToken');
const express = require('express');
const app = express();
const maxAge = 3 * 24 * 60 * 60;

const cookieChecker = (req, res) => {
	try {
		const cookies = req.cookies;
		res.status(200).json(cookies);
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};

const registerUser = async (req, res) => {
	const { email, username, password } = req.body;

	try {
		const user = await User.create({ email, username, password });
		const token = createToken(user._id);

		res.cookie('jwt', token, { maxAge: maxAge * 1000 });
		console.log('Cookies: ', res.cookies);

		res.status(201).json({ user: user._id });
	} catch (error) {
		const errors = handleValidationError(error);
		res.status(400).json({ errors });
	}
};

const userLogin = async (req, res) => {
	try {
		const { userName, password } = req.body;
		if (!(userName && password)) {
			res.status(400).json(
				'Please make sure your credentials are correct'
			);
		}

		const user = await User.findOne({ userName });
		let token;
		if (user && (await bcrypt.compare(password, user.password))) {
			console.log(bcrypt.compare(password, user.password));
			// token = jwt.sign(
			// 	{ user_id: user._id, userName },
			// 	process.env.TOKEN_KEY,
			// 	{
			// 		expiresIn: '30d',
			// 	}
			// );

			// saves the token
			res.status(200).json({ user });
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { userLogin, registerUser, cookieChecker };
