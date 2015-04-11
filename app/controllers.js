var models = require('./models');

/* Get all events */
exports.events = function(req, res) {
    var Events = require('./models').Events;
    var events = new Events();
    var json_response = {'events': []};
	events.fetch().then(function(collection) { 
    	collection.forEach(function (model) {
        	var json_obj = {'event_id': model.get('event_id'),
                            'event_name': model.get('event_name'),
                            'event_time': model.get('event_time'),
                            'event_desc_short': model.get('event_desc_short'),
                            'event_desc_long': model.get('event_desc_short'),
                            'event_recur': model.get('event_recur')};
        	json_response.events.push(json_obj);
        });
        res.send(json_response);
    }); 
};

