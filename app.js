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

const corsOptions = {
	origin: 'http://localhost:3000' || process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// app.use(require('./routes/record'));

//USER LOGIN and SIGNUP
app.use('/user/portal', userRouter);
app.get('/user/portal/register', (req, res) => {
	res.cookie('testing', 'hello idiot');
	res.status(200).json('cookies sent!');
});

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
	res.json(cookies.jwt);
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
