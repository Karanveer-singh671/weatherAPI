const knex = require("knex");
require("dotenv").config();
let db;
if (process.env.NODE_ENV !== "production") {
	db = knex({
		client: process.env.DB_CLIENT,
		connection: {
			host: process.env.DATABASE_URL,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		},
	});
} else {
	db = knex({
		client: process.env.DB_CLIENT,
		connection: {
			connectionString: process.env.DATABASE_URL,
			// ssl: true,
		},
	});
}

module.exports = db;
