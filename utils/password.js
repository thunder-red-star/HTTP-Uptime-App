function verifyPassword (input) {
	return input == process.env.PASSWORD;
}

function setPassword (oldPassword, newPassword) {
	if (verifyPassword(oldPassword)) {
		process.env.PASSWORD = newPassword;
		return true
	}
	else {
		return false
	}
}

module.exports = {
	verifyPassword,
	setPassword
}