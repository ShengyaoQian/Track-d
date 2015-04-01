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

module.exports = {
    /* Object maps to Event table in the database */
    Event : bookshelf.Model.extend({
        tableName: 'Event'
    })

};
