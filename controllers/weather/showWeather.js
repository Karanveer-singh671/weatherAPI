const axios = require("axios");
const utils = require("../../utils/utils");
const handleWeatherGet = (req, res) => {
	const filteredKeys = ["weather", "main", "sys", "name"];
	const city = utils.filterSpaces(req.query.city);
	const country = req.query.country;
	const units = req.query.units;
	return axios
		.get(
			`${process.env.API_BASE_URL}${req.path}?q=${city},${country}&appid=${process.env.API_KEY}&units=${units}`
		)
		.then((response) => utils.filterObject(response.data, filteredKeys))
		.then((response) => res.json(response))
		.catch((err) =>
			res.status(err.response.status).send(err.response.statusText)
		);
};

module.exports = {
	handleWeatherGet,
};
