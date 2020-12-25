const utils = require("../../utils/utils");
const jwt = require("jsonwebtoken");
const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	return db
		.select("*")
		.from("users")
		.where("email", "=", email)
		.then((user) => {
			const currentUser = user[0];
			const isValid = bcrypt.compareSync(password, currentUser.hash);
			if (isValid && currentUser.id && currentUser.email) {
				const session = utils.createSessions(currentUser);
				session ? res.json(session) : res.json("Something went wrong");
			} else {
				res.status(400).json("wrong credentials");
			}
		})
		.catch((err) => res.status(400).json("wrong credentials"));
};

const signinAuthentication = (req, res, db, bcrypt) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return handleSignin(req, res, db, bcrypt);
	}
	payload = jwt.verify(authorization, process.env.JWT_SECRET);
	if (payload instanceof jwt.JsonWebTokenError) {
		return res.status(401).end();
	}
	return res.json(authorization);
};
module.exports = { signinAuthentication };
