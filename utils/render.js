const url = require("url");
const path = require("path");

module.exports = (res, req, template, templateDir, data = {}) => {
	const baseData = {
		// nothing yet
	};
	return res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};

