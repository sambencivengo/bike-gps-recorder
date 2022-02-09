const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: [true, 'Please enter a username'] },
	email: {
		type: String,
		required: [true, 'Please enter a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a valid password'],
	},
	token: { type: String },
});

module.exports = mongoose.model('user', userSchema);
