'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('Event', function(table) {
			table.dropForeign('location_id');
			table.dropColumn('location_id');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
        knex.schema.table('Event', function (table) {
            table.bigInteger('location_id').unsigned().notNullable().unique().references('location_id').inTable('Location');
        })
	]);
};
