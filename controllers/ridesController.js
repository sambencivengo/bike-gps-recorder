const Ride = require('../models/ride');

const getAllRides = async (req, res) => {
	const rides = await Ride.find({});
	res.status(200).json({
		success: true,
		numberOfHits: rides.length,
		rides: rides,
	});
};

const createRide = async (req, res) => {
	try {
		const ride = await Ride.create(req.body);
		res.status(202).json({ success: true, data: ride });
	} catch (error) {
		res.status(400).json({ error });
	}
};
module.exports = { getAllRides, createRide };
