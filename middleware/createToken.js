const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: maxAge });
};

module.exports = createToken;
