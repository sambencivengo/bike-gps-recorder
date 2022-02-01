const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT || 5000;
const db = process.env.MONGO_URI;
app.use(cors());
app.use(express.json());
// app.use(require('./routes/record'));

// app.use('/api/v1/gps');

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
