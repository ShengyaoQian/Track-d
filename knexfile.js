// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'trackeddb.ctyl7vyaixcl.us-west-2.rds.amazonaws.com',
      port : '3306',
      user : 'master',
      password : 'trackd_jlmgs',
      database: 'trackeddb'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
