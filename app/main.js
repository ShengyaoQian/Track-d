var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(3000);
console.log('Server running at http://localhost:3000');

var models = require('./models');

/* Get all events*/
app.get('/events', function(req, res) {
    var Event = require('./models').Event;
    var event_id = new Event().fetch().then(function(model) { return model.get('event_id') });
    res.send({ event_id: 'event_id' });
});

