const jwt = require("jsonwebtoken");
const signToken = (email) => {
	/** no sensitive information in here! */
	const jwtPayload = { email };
	/** hard to revoke this token -> would add redis sessions to store jwt for fast revoking if needed */
	return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const createSessions = (user) => {
	const { email } = user;
	const token = signToken(email);
	/** return user data */
	return { success: "true", user, token };
};
/** filter an object's keys */
const filterObject = async (givenObject, arr) => {
	return Object.keys(givenObject)
		.filter((key) => arr.includes(key))
		.reduce((obj, key) => {
			obj[key] = givenObject[key];
			return obj;
		}, {});
};
/** replace multiple spaces between words with single space */
const filterSpaces = (str) => {
	return str
		.split(" ")
		.filter((s) => s)
		.join(" ");
};
module.exports.filterSpaces = filterSpaces;
module.exports.createSessions = createSessions;
module.exports.filterObject = filterObject;
