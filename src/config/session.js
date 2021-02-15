const session = require('express-session');
const pgSessions = require('connect-pg-simple')(session)
const db = require('./db');

module.exports = session ({
    store: new pgSessions({
        pool: db
    }),
    secret: 'chavesecreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
})