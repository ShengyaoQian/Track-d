var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '',
    port     : '',
    user     : '',
    password : '',
    database : '',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

/* Object maps to Event table in the database */
var Event = bookshelf.Model.extend({
    tableName: 'Event'
});



