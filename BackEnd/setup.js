const knex = require('knex');


( async (knex) => {
    const postgres = knex({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'password',
        }
    });
    
    await postgres.raw('CREATE DATABASE eka-test;');
} )()
