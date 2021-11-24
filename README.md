# HTTP Uptime App (WIP!)
A simple UptimeRobot style app that sends HTTP requests to specified websites at intervals. 
## Features
* Send requests at specifi-able intervals
* Password protected front-end (perfect for Replit)
## Implemented so far
- [x] Server is connectable
- [x] Can log in with password set in `.env`
- [x] Sets cookies that last 1 day
- [ ] Pinging functionality
- [ ] Ability to add pingers from the dashboard
- [ ] User functionality
- [ ] System for handling many users
## Setup
1. `git clone` this repository or do whatever it takes to have a full copy of this repo in your work directory.
2. `npm install` to install all prerequisite libraries.
3. Create a `.env` file and in it, write `PASSWORD=<your password here>`.
4. Optionally, you can add a port (`PORT=<your port here>`).
5. `node index.js` to start the server. 