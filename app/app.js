var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/events', require('./controllers.js').events);
app.get('/organizations', require('./controllers.js').organizations);

app.use(bodyParser.json()); 
app.post('/post_event', require('./controllers.js').post_event);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server running at http://%s:%s', host, port);
});
