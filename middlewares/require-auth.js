const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
	console.log(req.headers.authorization);
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader;

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}

			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};

module.exports = requireAuth;
