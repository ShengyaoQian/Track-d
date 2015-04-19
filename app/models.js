var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'trackeddb.ctyl7vyaixcl.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'master',
    password : 'trackd_jlmgs',
    database : 'trackeddb',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

/* Object maps to Event table in the database */
var Event = bookshelf.Model.extend({
    tableName: 'Event'
});

var Events = bookshelf.Collection.extend({
    model: Event
});

exports.Event = Event;
exports.Events = Events;

/* Object maps to Location table in the database */
var Location = bookshelf.Model.extend({
    tableName: 'Location'
});

var Locations = bookshelf.Collection.extend({
    model: Location
});

exports.Location = Location;
exports.Locations = Locations;

/* Object maps to Organization table in the database */
var Organization = bookshelf.Model.extend({
    tableName: 'Organization'
});

var Organizations = bookshelf.Collection.extend({
    model: Organization
});

exports.Organization = Organization;
exports.Organizations = Organizations;

