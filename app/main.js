var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(3000);
console.log('Server running at http://localhost:3000');

var models = require('./models')
/* Get all locations*/
app.get('/events', function(req, res) {
    res.status(200).end();  
    res.send();
});

