const express = require("express");
const requireAuth = require("../../middlewares/require-auth")
const weather = require("../../controllers/weather/showWeather");
const getWeatherRouter = express.Router();

getWeatherRouter.get("/weather",requireAuth, (req, res) => {
	weather.handleWeatherGet(req, res);
});

module.exports = getWeatherRouter;
