const url = require("url");
const path = require("path");

const renderTemplate = (res, req, template, data = {}) => {
	const baseData = {
		path: req.path,
	};
	res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};

module.exports = renderTemplate();