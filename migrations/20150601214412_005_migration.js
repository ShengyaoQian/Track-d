'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('Event', function(table) {
			table.string('org_name');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table('Event', function(table) {
			table.dropColumn('org_name');
		})
	]);
};
