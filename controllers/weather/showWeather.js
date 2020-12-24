const axios = require("axios");
const handleWeatherGet = (req, res) => {
	const city = req.query.q;
	const units = req.query.units;
	return axios
		.get(
			`${process.env.API_BASE_URL}${req.path}?q=${city}&appid=${process.env.API_KEY}&units=${units}`
		)
		.then((response) => res.json(response.data))
		.catch((err) =>
			res.status(err.response.status).send(err.response.statusText)
		);
};

module.exports = {
	handleWeatherGet,
};
