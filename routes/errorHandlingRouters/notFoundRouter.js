const express = require("express");
const notFoundRouter = express.Router();

notFoundRouter.all("*", (req, res) => {
	const err = new Error(`Requested URL ${req.path} Not Found`);
	res.status(404).json({
		message: err.message,
	});
});

module.exports = notFoundRouter;
