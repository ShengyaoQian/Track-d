var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(3000);
console.log('Server running at http://localhost:3000');

var models = require('./models');

/* Get all events */
app.get('/events', function(req, res) {
    var Events = require('./models').Events;
    var events = new Events();
    var json_response = [];
	events.fetch().then(function(collection) { 
    	collection.forEach(function (model) {
        	var json_obj = {'event_id': model.get('event_id')};
        	json_response.push(json_obj);
        });
        res.send(json_response);
    }); 
});


