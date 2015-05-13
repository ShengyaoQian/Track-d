var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var __dirname = '..';
var path = '';

app.use(express.static(__dirname + path));

app.get('/', function(req, res) {
    res.send('Hello Kitty');
});

app.get('/events_today', require('./controllers.js').events_today);
app.get('/events', require('./controllers.js').events);
app.get('/organizations', require('./controllers.js').organizations);

app.use(bodyParser.json()); 
app.post('/post_event', require('./controllers.js').post_event);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
});
