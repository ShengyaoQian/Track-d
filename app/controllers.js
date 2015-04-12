var models = require('./models');
var async = require('async');

/* Get all events */
exports.events = function(req, res) {
    var json_response = {'events': []};
    var callback_counts = 0;
    get_events_info(json_response, callback_counts, function() {
        res.send(json_response);
    });
    
        
};

function get_events_info(json_response, callback_counts, callback) {
    var Events = require('./models').Events;
    var events = new Events();
    events.fetch().then(function (collection) { 
        var collection_size = Object.keys(collection.models).length;
        async.each(collection.models, function (model) {                      
            var json_obj = {'event_id': model.get('event_id'),
                            'event_name': model.get('event_name'),
                            'event_time': model.get('event_time'),
                            'event_desc_short': model.get('event_desc_short'),
                            'event_desc_long': model.get('event_desc_long'),
                            'event_recur': model.get('event_recur')};
            var Location = require('./models').Location;
            var location = new Location();
            var loc_info = null; 
            location.fetch({'location_id': model.get('location_id')}).then(function (model) {
                loc_info = {'location_id': model.get('location_id'),
                            'name': model.get('name'),
                            'address': model.get('address'),
                            'lat': model.get('lat'),
                            'log': model.get('log')};
                json_obj['loc_info'] = loc_info;
                json_response.events.push(json_obj);
                callback_counts ++;
                if (callback_counts == collection_size) {
                    callback(json_response);
                };
            });
        });  
    }); 
};




