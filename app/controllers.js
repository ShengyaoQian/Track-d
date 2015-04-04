var models = require('./models');

/* Get all events */
exports.events = function(req, res) {
    var Events = require('./models').Events;
    var events = new Events();
    var json_response = {'events': []};
	events.fetch().then(function(collection) { 
    	collection.forEach(function (model) {
        	var json_obj = {'event_id': model.get('event_id')};
        	json_response.events.push(json_obj);
        });
        res.send(json_response);
    }); 
};

