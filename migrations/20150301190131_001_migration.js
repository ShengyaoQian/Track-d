'use strict';

/* first version of trackeddb
*/

exports.up = function(knex, Promise) {
    return Promise.all([
        /* Create table Event table. */
        knex.schema.createTable('Event', function (table) {
            table.bigIncrements('event_id').primary().unsigned().index();
            table.string('event_name', 50);
            table.dateTime('event_time');
            table.string('event_location');
            table.string('event_desc');
            table.boolean('event_recur');
        }),
        
        /* Create OrgApproved table which contains a list of email of approved organizations. */ 
        knex.schema.createTable('OrgApproved', function (table) {
            table.string('email').primary();
        }),
        
        /* Create Organization table. */ 
        knex.schema.createTable('Organization', function (table) {
            table.bigIncrements('org_id').primary().unsigned();
            table.string('user_name').notNullable().index();
            table.string('name').notNullable();
            table.string('email').notNullable().unique().references('email').inTable('OrgApproved');
            table.string('org_location');
            table.string('website');
            table.string('facebook');
            table.string('org_desc');
        }),
        
        /* Create Organization to Event table. */  
        knex.schema.createTable('Org_Event', function (table) {
            table.bigInteger('event_id').unsigned().notNullable().unique().references('event_id').inTable('Event');
            table.bigInteger('org_id').unsigned().notNullable().unique().references('org_id').inTable('Organization');
            table.primary(['event_id', 'org_id']);
        }),

        /* Create Place_Type table. */ 
        knex.schema.createTable('Place_Type', function (table) {
            table.bigIncrements('type_id').primary().unsigned();
            table.string('type_name');
        }),
        
        /* Create Place table. */ 
        knex.schema.createTable('Place', function (table) {
            table.bigIncrements('place_id').primary().unsigned();
            table.bigInteger('org_id').unsigned().notNullable().unique().references('org_id').inTable('Organization');
            table.bigInteger('type_id').unsigned().notNullable().unique().references('type_id').inTable('Place_Type');
            table.string('place_name');
            table.string('place_location');
            table.dateTime('open_time');
            table.dateTime('close_time');
            table.string('place_desc');
        }),
        
        /* Create Login table. */
        knex.schema.createTable('Login', function (table) {
            table.bigIncrements('user_id').primary().unsigned();
            table.string('user_name').notNullable().unique().references('user_name').inTable('Organization');
            table.string('password').notNullable();
        }),
        
        /* Create Person table. */
        knex.schema.createTable('Person', function (table) {
            table.bigIncrements('person_id').primary().unsigned();
            table.string('user_name').notNullable().unique().references('user_name').inTable('Login');
            table.string('user_email');
            table.string('first_name');
            table.string('last_name');
            table.string('major');
        }),
        
        /* Create Tag table */
        knex.schema.createTable('Tag', function (table) {
            table.bigIncrements('tag_id').primary().unsigned();
            table.string('tag_name');
        }),
        
        /* Create Event to Tag table. */
        knex.schema.createTable('Event_Tag', function (table) {
            table.bigInteger('tag_id').unsigned().notNullable().unique().references('tag_id').inTable('Tag');
            table.bigInteger('event_id').unsigned().notNullable().unique().references('event_id').inTable('Event');
        }) 

    ]);  
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('Event_Tag'),
        knex.schema.dropTable('Tag'),
        knex.schema.dropTable('Person'),
        knex.schema.dropTable('Login'),
        knex.schema.dropTable('Place'),
        knex.schema.dropTable('Place_Type'),
        knex.schema.dropTable('Org_Event'),
        knex.schema.dropTable('Organization'),
        knex.schema.dropTable('OrgApproved'),
        knex.schema.dropTable('Event')
    ]);
};
