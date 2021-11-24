const url = require("url");
const path = require("path");

const renderTemplate = (res, req, template, data = {}) => {
	const baseData = {
		path: req.path,
		user: req.isAuthenticated() ? req.user :
			null
	};
	// We render template using the absolute path 
	res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};