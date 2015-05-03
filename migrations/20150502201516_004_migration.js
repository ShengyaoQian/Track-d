'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('Organization', function(table) {
			table.dropForeign('location_id');
			table.dropColumn('location_id');
			table.string('picture_link');
			table.float('lat', 13, 10);
            table.float('long', 13, 10);
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('Organization', function(table) {
			table.bigInteger('location_id').unsigned().notNullable().unique().references('location_id').inTable('Location');
			table.dropColumn('picture_link');
			table.dropColumn('lat');
			table.dropColumn('long');
		})
	]);
};
