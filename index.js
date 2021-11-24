const express = require('express')
const app = express();

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 3000, function() {
    console.log('listening on *:' + process.env.PORT || 3000, process.env.PORT);
});
