const utils = require("../../utils/utils");
const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if(!email || !password) {
		return res.status(400).send("Please enter valid Email. Password must be between 4 and 20 characters")
	}
	/** does 1024 times over */
	const saltRounds = 10;
	bcrypt.hash(password, saltRounds).then(function (hash) {
		// Store hash in your password DB.
		db.transaction((trx) => {
			trx
				.insert({
					hash,
					email,
					name,
				})
				.into("users")
				.returning("*")
				.then((user) => {
					const currentUser = user[0];
					const session = utils.createSessions(currentUser);
					session ? res.json(session) : res.json("Something went wrong");
				})
				.then(trx.commit)
				.catch(trx.rollback);
			/** replaced this line with console.log & redeployed register worked */
		}).catch((err) =>
			// console.log(err));
			res.status(400).json("unable to register")
		);
	});
};

module.exports = {
	handleRegister,
};
