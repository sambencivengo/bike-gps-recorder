const gpsData = require('../rides');

const getAllRides = (req, res) => {
	const rides = gpsData;
	res.status(200).json({ rides: gpsData });
};

module.exports = { getAllRides };
