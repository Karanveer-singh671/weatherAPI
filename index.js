const app = require("./app");

/** env checks */
if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL must be defined");
}
if (!process.env.DB_NAME) {
	throw new Error("DB_NAME must be defined");
}
if (!process.env.DB_PASSWORD) {
	throw new Error("DB_PASSWORD must be defined");
}
if (!process.env.DB_USER) {
	throw new Error("DB_USER must be defined");
}
if (!process.env.API_KEY) {
	throw new Error("API_KEY must be defined");
}
if (!process.env.API_BASE_URL) {
	throw new Error("API_BASE_URL must be defined");
}
app.listen(process.env.PORT || 5000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
