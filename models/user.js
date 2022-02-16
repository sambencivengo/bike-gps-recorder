const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please enter a username'],
		unique: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, 'Please enter a valid email address'],
		unique: true,
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
});

// function fires after the doc is saved
// userSchema.post('save', (doc, next) => {
// 	console.log('New user was created & saved', doc);
// 	next();
// });

// function fires before the doc is saved
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

module.exports = mongoose.model('user', userSchema);
