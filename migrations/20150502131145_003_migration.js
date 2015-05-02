'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('Event', function(table) {
			table.dropColumn('event_time');
			table.dateTime('start_time');
			table.dateTime('end_time');
			table.string('picture_link');
			table.string('location');
			table.float('lat', 13, 10);
            table.float('long', 13, 10);
		})
	]);
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.table('Event', function(table) {
			table.dropColumn('start_time');
			table.dropColumn('end_time');
			table.dropColumn('picture_link');
			table.dropColumn('location');
			table.dropColumn('lat');
			table.dropColumn('long');
			table.dateTime('event_time');
		})
	]);
};
