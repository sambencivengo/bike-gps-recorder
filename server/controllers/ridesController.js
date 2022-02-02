const gpsData = require('../rides');
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
	const ride = await Ride.create(req.body);
	res.status(202).json({ succuss: true, data: ride });
};
module.exports = { getAllRides, createRide };
