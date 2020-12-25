const express = require("express");
const validateRequest = require("../../middlewares/validate-request");
const signin = require("../../controllers/authentication/signin");
const signInRouter = express.Router();
const db = require("../../db/dbConnect");
const bcrypt = require("bcrypt");
signInRouter.post(
	"/signin",
	validateRequest,
	(req, res) => {
		signin.signinAuthentication(req, res, db, bcrypt);
	}
);
module.exports = signInRouter;
