const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please enter a username'],
		unique: [true, 'This username has already been taken'],
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, 'Please enter a valid email address'],
		unique: [true, 'An account associated with this email already exists'],
		lowercase: true,
		validate: [validator.isEmail, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [
			6,
			'Please enter a password that is at least 6 characters in length',
		],
	},
	token: { type: String },
});

module.exports = mongoose.model('user', userSchema);
