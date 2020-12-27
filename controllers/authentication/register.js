const utils = require("../../utils/utils");
const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email ||!name || !password) {
		return res
			.status(400)
			.send(
				"Fill Out all Fields."
			);
	}
	const saltRounds = 10;
	bcrypt.hash(password, saltRounds).then(function (hash) {
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
		}).catch((err) => res.status(400).json("unable to register"));
	});
};

module.exports = {
	handleRegister,
};
