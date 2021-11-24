const fs = require('fs');
const Chalk = require('chalk')

console.log(Chalk.green('Starting setup!'))
if (!fs.existsSync('data')) {
	console.log(Chalk.red('Data folder does NOT exist, creating one.'))
	fs.mkdirSync('./data')
	console.log(Chalk.red('Creating monitors storage file'))
	fs.writeFileSync('./data/monitors.json', "{}")
}else {
	console.log(Chalk.yellow('Data folder exists already.'))
	console.log(Chalk.red('Creating monitors storage file.'))
	fs.writeFileSync('./data/monitors.json', "{}")
}
console.log(Chalk.green('The installation is done.'))