const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const enforce = require("express-sslify");
const getWeatherRouter = require("./routes/weatherRouters/weatherRouter");
const registerRouter = require("./routes/authenticationRouters/registerRouter");
const signInRouter = require("./routes/authenticationRouters/signinRouter");
const notFoundRouter = require("./routes/errorHandlingRouters/notFoundRouter");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(registerRouter);
app.use(signInRouter);
app.use(getWeatherRouter);
/** handle any route that doesn't match */
app.use(notFoundRouter);

/** test route */
app.get("/", (req, res) => {
	res.send("it is working");
});

if (process.env.NODE_ENV === "production") {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

module.exports = app;
