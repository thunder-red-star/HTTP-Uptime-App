const express = require('express')
const app = express();

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 8080, function() {
    console.log('listening on *:8080', process.env.PORT);
});
