const bcrypt = require('bcryptjs/dist/bcrypt');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const handleValidationError = require('../errors/validation');

const registerUser = async (req, res) => {
	const { email, username, password } = req.body;
	console.log(email, username, password);

	try {
		const user = await User.create({ email, username, password });
		res.status(201).json(user);
	} catch (error) {
		const errors = handleValidationError(error);
		res.status(400).json({ errors });
	}
	// OLD BLOCK
	//
	// try {
	// 	const { userName, email, password } = req.body;
	// 	// make sure the inputs are filled out
	// 	if (!(email && userName && password)) {
	// 		res.status(400).json({
	// 			success: false,
	// 			msg: 'All input is required',
	// 		});
	// 	}
	// 	// check for the existing user
	// 	const existingUser = await User.findOne({ email });
	// 	if (existingUser) {
	// 		return res.status(409).json({
	// 			success: false,
	// 			msg: 'An user with this email already exists',
	// 		});
	// 	}
	// 	const encryptedPassword = await bcrypt.hash(password, 10);
	// 	// create user in the DB
	// 	const user = await User.create({
	// 		userName,
	// 		email: email.toLowerCase(),
	// 		password: encryptedPassword,
	// 	});
	// 	//send response
	// 	res.status(201).json({ user });
	// } catch (error) {
	// 	console.log(error);
	// }
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
			token = jwt.sign(
				{ user_id: user._id, userName },
				process.env.TOKEN_KEY,
				{
					expiresIn: '30d',
				}
			);

			// saves the token
			res.status(200).json({ user });
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { userLogin, registerUser };
