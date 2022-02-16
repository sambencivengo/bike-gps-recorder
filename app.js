const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const connectDB = require('./db/connect');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;
const ridesRouter = require('./routes/ridesRouter');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(require('./routes/record'));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//USER LOGIN and SIGNUP
app.use('/user/portal', userRouter);

app.use('/api/v1/rides', ridesRouter);

// COOKIES
app.get('/set-cookies', (req, res) => {
	res.cookie('newUser', false);
	res.cookie('employee', true, {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,
	});
	res.send('you got cookies!');
});

app.get('/read-cookies', (req, res) => {
	const cookies = req.cookies;
	console.log(cookies);
	res.json(cookies.newUser);
});
//
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build'));
});
const start = async () => {
	try {
		await connectDB(db);
		app.listen(port, () => {
			console.log(`server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
