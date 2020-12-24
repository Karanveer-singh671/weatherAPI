const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	return db.select("*")
		.from("users")
		.where("email", "=", email)
		.then((user) => {
			const isValid = bcrypt.compareSync(password, user[0].hash);
			if (isValid) {
				return res.json(user[0]);
			} else {
				res.status(400).json("wrong credentials");
			}
		})
		.catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = { handleSignin };
