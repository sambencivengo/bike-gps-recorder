const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const connectDB = require('./db/connect');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;
const ridesRouter = require('./routes/ridesRouter');
app.use(cors());
app.use(express.json());
// app.use(require('./routes/record'));

app.use('/api/v1/rides', ridesRouter);
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
