const jwt = require("jsonwebtoken");
const signToken = (email) => {
	/** no sensitive information in here! */
	const jwtPayload = { email };
	/** hard to revoke this token -> would add redis sessions to store jwt for fast revoking if needed */
	return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const createSessions = (user) => {
	/** JWT Token return user data */
	const { email } = user;
	const token = signToken(email);
	/** if added new endpoints like profile page profile/:id then frontend can query using id for that profile */
	/** would want to save this token in session storage for example on the frontend */
	return { success: "true", user, token };
};

const filterObject = async (givenObject, arr) => {
	return Object.keys(givenObject)
		.filter((key) => arr.includes(key))
		.reduce((obj, key) => {
			obj[key] = givenObject[key];
			return obj;
		}, {});
};

const filterSpaces = (str) => {
	return str
		.split(" ")
		.filter((s) => s)
		.join(" ");
};
module.exports.filterSpaces = filterSpaces;
module.exports.createSessions = createSessions;
module.exports.filterObject = filterObject;
