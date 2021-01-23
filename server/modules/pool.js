
// Require postgres driver
const pg = require('pg');

const pool = new pg.Pool({
    database: 'to_do_list', // CHANGE THIS to match YOUR database name,
    host: 'localhost',
    user: '', // username for postgres (check postico)
    password: '', // password for postgres (mac users dont need this) 
    port: 5432, // 5432 is the default postgres port
    max: 10, // How many reserved databse connections to cap at
    idleTimeoutMillis: 30000, // How long to wait for a query to finish
});

// purely to check that our pool is working appropriately! just
// for debugging purposes. NOT required.
pool.on('connect', () => {
    console.log('Postgres Connected Successfully');
});

// The pool will emit an error if any of the connections run
// into issues, and we can print that error via this callback
pool.on('error', (error) => {
    console.log('Error connecting Postgres:', error);
});

module.exports = pool;