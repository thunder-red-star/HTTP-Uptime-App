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

const saveAge = 3600000;
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
		return render(res, req, 'login.ejs');
	});

	app.post('/login', (res, req, next) => {
		if (res.cookies.saveLogin != undefined) {
			try {
				// wipe broken cookie
				if (!pw.verifyPassword(req.cookies.saveLogin)) {
					res.clearCookie('saveLogin');
					return render(res, req, 'login.ejs', { "error": "There was a malformed or wrong cookie on your device. We have wiped it. Please try logging in again." });
				}
				else {
					res.cookie('saveLogin', process.env.PASSWORD, { maxAge: saveAge });
					return res.redirect('/dashboard');
				}
			}
		}
		try {
			if (!pw.verifyPassword(req.body.input)) {
				return render(res, req, 'login.ejs', { "error": "You have inputted an incorrect password." });
			}
			else {
				res.cookie('saveLogin', process.env.PASSWORD, { maxAge: saveAge });
				return res.redirect('/dashboard');
			}
		}
		catch {
			return render(res, req, 'login.ejs', { "error": "An internal server error has occurred. Please try again later." });
		}
	});
}
