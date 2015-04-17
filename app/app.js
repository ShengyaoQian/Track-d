var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/events', require('./controllers.js').events);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
});
