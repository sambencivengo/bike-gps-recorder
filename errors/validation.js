const handleValidationError = (err) => {
	console.log(err.message, err.code);
	const errors = {
		email: '',
		password: '',
		username: '',
	};

	//duplicate error code

	if (err.code === 11000) {
		if (err.keyValue.username) {
			errors.username = 'That username has already been taken';
		}
		if (err.keyValue.email) {
			errors.email = 'That email has already been taken';
		}
		return errors;
	}

	//validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

module.exports = handleValidationError;
