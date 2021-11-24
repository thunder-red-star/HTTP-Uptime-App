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

module.exports = () => {
	const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

	app.use(session({
		store: new MemoryStore({ checkPeriod: 86400000 }),
		secret: "10993D1N",
		resave: false,
		saveUninitialized: false,
	}));

	app.use(express.cookieParser());
	app.use(bodyParser.json());
	
	app.engine("html", ejs.renderFile);
	app.set("view engine", "html");

	app.get('/login', (res, req, next) => {

	})
}
