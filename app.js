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

function loggedInChecker(cookies) {
	console.log(cookies)
	try {
		return pw.verifyPassword(cookies.saveLogin);
	}
	catch {
		return false;
	}
}

module.exports = () => {
	const templateDir = path.resolve(`${__dirname}${path.sep}templates`);

	app.use(session({
		store: new MemoryStore({ checkPeriod: 86400000 }),
		secret: "10993D1N",
		resave: false,
		saveUninitialized: false,
	}));

	app.use(cookieParser());
	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.engine("html", ejs.renderFile);
	app.set("view engine", "html");

	app.use(express.static(__dirname + '/public'));

	app.get('/', (req, res) => {
		return res.redirect('/dashboard')
	})

	app.get('/dashboard', (req, res, next) => {
		if (!loggedInChecker(req.cookies)) {
			return res.redirect('/login')
		}
		return render(res, req, 'dashboard.ejs', templateDir);
	});

	app.get('/login', (req, res, next) => {
		return render(res, req, 'login.ejs', templateDir)
	});

	app.post('/login', (req, res, next) => {
		console.log(req.cookies)
		try {
			if (!req.cookies.saveLogin) {
				throw "someone doesn't have a cookie. this is not an error but simply to bypass try/catch ;-;"
			}
			try {
				// wipe broken cookie
				if (!loggedInChecker(req.cookies)) {
					res.cookie('saveLogin', '', { maxAge: 0 });
					return render(res, req, 'login.ejs', templateDir, { "error": "There was a malformed or wrong cookie on your device. We have wiped it. Please try logging in again." });
				}
				else {
					res.cookie('saveLogin', process.env.PASSWORD, { maxAge: saveAge });
					return res.redirect('/dashboard');
				}
			}
			catch {
				return render(res, req, 'login.ejs', templateDir, { "error": "An internal server error has occurred. Please try again later." });
			}
		}
		catch {
			try {
				console.log(req.body)
				if (!pw.verifyPassword(req.body.input)) {
					return render(res, req, 'login.ejs', templateDir, { "error": "You have inputted an incorrect password." });
				}
				else {
					res.cookie('saveLogin', process.env.PASSWORD, { maxAge: saveAge });
					return res.redirect('/dashboard');
				}
			}
			catch {
				return render(res, req, 'login.ejs', templateDir, { "error": "An internal server error has occurred. Please try again later." });
			}
		}
	});

	app.get('/logout', (req, res, next) => {
		res.cookie('saveLogin', process.env.PASSWORD, { maxAge: 0 });
		return res.redirect('/dashboard');
	});

	app.listen(process.env.PORT || 3000, null, null, () => {
		console.log(`App is running on *.${process.env.PORT || 3000}`)
	});
}
