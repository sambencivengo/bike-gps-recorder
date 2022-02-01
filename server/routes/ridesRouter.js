const express = require('express');
const ridesRouter = express.Router();

const { getAllRides } = require('../controllers/ridesController');

ridesRouter.route('/').get(getAllRides);

module.exports = ridesRouter;
