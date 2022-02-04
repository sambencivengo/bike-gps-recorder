const express = require('express');
const ridesRouter = express.Router();

const { getAllRides, createRide } = require('../controllers/ridesController');

ridesRouter.route('/').get(getAllRides).post(createRide);

module.exports = ridesRouter;
