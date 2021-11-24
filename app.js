// a pile of imports, because why not

const express = require('express')
const app = express();
const session = require("express-session");
const cookieParser = require('cookie-parser')
const ejs = require("ejs");
const MemoryStore = require('memorystore')(session);
const path = require('path');
const bodyParser = require("body-parser");

const pw = require('./utils/password.js');
const render = require('./utils/render.js')

module.exports = () => {
	const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

	app.use(session({
		store: new MemoryStore({ checkPeriod: 86400000 }),
		secret: "10993D1N",
		resave: false,
		saveUninitialized: false,
	}));

	app.use(cookieParser());
	app.use(bodyParser.json());

	app.engine("html", ejs.renderFile);
	app.set("view engine", "html");

	app.get('/login', (res, req, next) => {
		return render(res, req, 'index.ejs');
	});

	app.post('/login', (res, req, next) => {
		if (pw.verifyPassword(req.body.input)) {
			render(res, req, 'index.ejs', {"error": "You have inputted an incorrect password."});
		}
	});
}
