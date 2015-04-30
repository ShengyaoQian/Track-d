var models = require('./models');
var async = require('async');


exports.events = function(req, res) {
    var json_response = {'events': []};
    var callback_counts = 0;
    get_events_info(json_response, callback_counts, function() {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(json_response);
    });   
};

function get_events_info(json_response, callback_counts, callback) {
    var Events = require('./models').Events;
    var events = new Events();
    var now = new Date();
    events.query(function(qb) {
        qb.where('event_time', '>', now);
    }).fetch().then(function (collection) { 
        var collection_size = Object.keys(collection.models).length;
        if (collection_size == 0) {
                callback(json_response);
        };
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
            location.query({where: {'location_id': model.get('location_id')}}).fetch().then(function (model) {
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

exports.organizations = function(req, res) {
    var json_response = {'organizations': []};
    var callback_counts = 0;
    var org_id = req.query.org_id;
    get_organization_info(json_response, org_id, callback_counts, function() {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(json_response);
    });
};

function get_organization_info(json_response, org_id, callback_counts, callback) {
    if (org_id) {
        var Organization = require('./models').Organization;
        var organization = new Organization();
        organization.query({where: {'org_id': org_id}}).fetch().then(function (model) {
            if (model) {
                callback_counts ++;
                build_org_json_object(model, callback_counts, 1, json_response, callback);
            } else {
                callback(json_response);
            } 
        });
    } else {
        var Organizations = require('./models').Organizations;
        var organizations = new Organizations();
        organizations.fetch().then(function (collection) { 
            var collection_size = Object.keys(collection.models).length;
            if (collection_size == 0) {
                callback(json_response);
            };
            async.each(collection.models, function (model) {  
                callback_counts ++;
                build_org_json_object(model, callback_counts, collection_size, json_response, callback);            
            });
        });  
    };
    
};

function build_org_json_object(model, callback_counts, collection_size, json_response, callback) {
    var json_obj = {'org_id': model.get('org_id'),
                    'name': model.get('name'),
                    'user_name': model.get('user_name'),
                    'email': model.get('email'),
                    'website': model.get('website'),
                    'facebook': model.get('facebook'),
                    'org_desc': model.get('org_desc'),
                    'approved': model.get('approved')};
    var Location = require('./models').Location;
    var location = new Location();
    var loc_info = null; 
    location.query({where: {'location_id': model.get('location_id')}}).fetch().then(function (model) {
        loc_info = {'location_id': model.get('location_id'),
                    'name': model.get('name'),
                    'address': model.get('address'),
                    'lat': model.get('lat'),
                    'log': model.get('log')};
        json_obj['loc_info'] = loc_info;
        json_response.organizations.push(json_obj);
        if (callback_counts == collection_size) {
            callback(json_response);
        };
    });

};

exports.post_event = function(req, res) {
    if (req.body) {
        json_request = req.body['Data'];
        if (json_request) {
            var Event = require('./models').Event;
            for (var i in json_request) {
                var event = new Event(json_request[i]);
                event.save();
            }
            res.send(json_request);
        } else {
            res.send('no data supplied');
        }
    } else {
        res.send('No request object');
    }   
};






