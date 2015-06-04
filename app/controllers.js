var models = require('./models');
var async = require('async');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

exports.events_today = function(req, res) {
    var json_response = {'events': []};
    var Events = require('./models').Events;
    var events = new Events();

    var today = new Date();
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);
    var next_day = new Date();
    next_day.setDate(today.getDate() + 1);
    next_day.setSeconds(0);
    next_day.setMinutes(0);
    next_day.setHours(0);
    events.query(function(qb) {
        qb.where('start_time', '>', today).andWhere('end_time', '<', next_day).orderBy('start_time', 'asc');
    }).fetch().then(function(collection) {
        get_events(collection, json_response);
    }).then(function() {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(json_response);
    });

};

exports.events = function(req, res) {
    var json_response = {'events': []};
    var Events = require('./models').Events;
    var events = new Events();

    var today = new Date();
    today.setSeconds(0);
    today.setMinutes(0);
    today.setHours(0);

    events.query(function(qb) {
        qb.where('start_time', '>', today).orderBy('start_time', 'asc');
    }).fetch().then(function(collection) {
        get_events(collection, json_response);
    }).then(function() {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(json_response);
    });  
};

function get_events(collection, json_response) {
    collection.forEach(function (model) {
        var loc_info = {'location': model.get('location'),
                        'lat': model.get('lat'),
                        'long': model.get('long')};
        var json_obj = {'event_id': model.get('event_id'),
                        'event_name': model.get('event_name'),
                        'start_time': model.get('start_time'),
                        'end_time': model.get('end_time'),
                        'event_desc_short': model.get('event_desc_short'),
                        'event_desc_long': model.get('event_desc_long'),
                        'event_recur': model.get('event_recur'),
                        'picture_link': model.get('picture_link'),
                        'org_name': model.get('org_name'),
                        'loc_info': loc_info};
        json_response.events.push(json_obj);
        
    });
};

exports.organizations = function(req, res) {
    var json_response = {'organizations': []};
    var Organizations = require('./models').Organizations;
    var organizations = new Organizations();
    var org_id = req.query.org_id;
    if (org_id) {
        organizations.query({where: {'org_id': org_id}}).fetch().then(function (collection) {
            get_orgs(collection, json_response);
        }).then(function () {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(json_response);
        });
    } else {
        organizations.fetch().then(function (collection) {
            get_orgs(collection, json_response);
        }).then(function () {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(json_response);
        });
    }
};

function get_orgs(collection, json_response) {
    collection.forEach(function (model){
        var loc_info = {'location': model.get('org_location'),
                        'lat': model.get('lat'),
                        'long': model.get('long')};
        var json_obj = {'org_id': model.get('org_id'),
                        'name': model.get('name'),
                        'user_name': model.get('user_name'),
                        'email': model.get('email'),
                        'website': model.get('website'),
                        'facebook': model.get('facebook'),
                        'org_desc': model.get('org_desc'),
                        'approved': model.get('approved'),
                        'loc_info': loc_info};
        json_response.organizations.push(json_obj);

    });
};

/* Sample request JSON:

{"event_name":"brbgfcx",
"optradio":"on",
"org_name":"vef",
"date":"06/14/2015",
"s_time":"1:30 PM",
"e_time":"4:30 PM",
"room":"",
"location":"Meany Hall for the Performing Arts, George Washington Lane Northeast, Seattle, WA, United States",
"event_desc_short":"",
"event_desc_long":"brgdf",
"lat":"47.655709",
"long":"-122.31056899999999",
"start_time":"2015-06-14T20:30:00.000Z",
"end_time":"2015-06-14T23:30:00.000Z"} 

*/

exports.post_event = function(req, res) {
    if (req.body) {
        var request_body = req.body;

        var Event = require('./models').Event;
        var uuid = guid();

        json_request = {'event_id': uuid,
                        'event_name': request_body.event_name,
                        'start_time': request_body.start_time,
                        'end_time': request_body.end_time,
                        'event_desc_short': request_body.event_desc_short,
                        'event_desc_long': request_body.event_desc_long,
                        'location': request_body.location,
                        'long': request_body.long,
                        'org_name': request_body.org_name,
                        'lat': request_body.lat};

        var event = new Event(json_request);

        event.save();
        res.send(json_request);
    } else {
        res.send('No request object');
    }   
};






