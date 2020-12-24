const express = require("express");
const weather = require("../../controllers/weather/showWeather");
const getWeatherRouter = express.Router();

getWeatherRouter.get("/weather", (req, res) => {
	weather.handleWeatherGet(req, res);
});

module.exports = getWeatherRouter;
