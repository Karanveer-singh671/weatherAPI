const express = require("express");
const { body } = require("express-validator");
const validateRequest = require("../../middlewares/validate-request");
const signin = require("../../controllers/authentication/signin");
const signInRouter = express.Router();
const db = require("../../db/dbConnect");
const bcrypt = require("bcrypt");

signInRouter.post(
	"/signin",
	[
		/** sanitize email and check password length */
		body("email")
			.trim()
			.normalizeEmail()
			.isEmail()
			.withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters"),
	],
	validateRequest,
	(req, res) => {
		signin.handleSignin(req, res, db, bcrypt);
	}
);
module.exports = signInRouter;
