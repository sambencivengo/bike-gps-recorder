const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please provide a name for your ride'],
	},
	userId: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	coordinates: [
		{
			lat: { type: Number },
			lng: { type: Number },
		},
	],
});

module.exports = mongoose.model('Ride', rideSchema);
