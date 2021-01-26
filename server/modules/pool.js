
// Require postgres driver
const pg = require('pg');
const url = require('url');
let config = {};
if(process.env.DATABASE_URL){
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl:{rejectUnauthorized: false},
    };
}else{
    config = {
        host: 'localhost',
        port: 5432,
        database: 'to_do_list', // CHANGE THIS LINE to match your local database name!
    };
}
const pool = new pg.Pool(config);

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