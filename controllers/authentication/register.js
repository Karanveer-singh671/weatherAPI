const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
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
					res.json(user[0]);
				})
				.then(trx.commit)
				.catch(trx.rollback);
		}).catch((err) => res.status(400).json("unable to register"));
	});
};

module.exports = {
	handleRegister,
};
