const { Pool } = require('pg');

module.exports = new Pool({
    user: 'postgres',
    password: '20062001418',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
});