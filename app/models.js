var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    port     : '8889',
    user     : 'root',
    password : 'root',
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

var Location = bookshelf.Model.extend({
    tableName: 'Location'
});

var Locations = bookshelf.Collection.extend({
    model: Location
});

exports.Location = Location;
exports.Locations = Locations;