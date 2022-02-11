const bcrypt = require('bcryptjs/dist/bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
	try {
		const { userName, email, password } = req.body;

		// make sure the inputs are filled out
		if (!(email && userName && password)) {
			res.status(400).json({
				success: false,
				msg: 'All input is required',
			});
		}

		// check for the existing user
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				msg: 'An user with this email already exists',
			});
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		// create user in the DB
		const user = await User.create({
			userName,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		//Create token
		const token = jsonwebtoken.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: '2h',
			}
		);
		user.token = token;

		//send response
		res.status(201).json({ user });
	} catch (error) {
		console.log(error);
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

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jsonwebtoken.sign(
				{ user_id: user._id, userName },
				process.env.TOKEN_KEY,
				{
					expiresIn: '2h',
				}
			);

			// saves the token
			user.token = token;

			res.status(200).json({ user });
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { userLogin, registerUser };
