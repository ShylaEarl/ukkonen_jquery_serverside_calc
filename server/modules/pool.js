const pg = require ('pg');

//set up PG to connect to DB
const Pool = pg.Pool;
const pool = new Pool({
    database: 'mathHistory', //the name of the database. This can change!
    host: 'localhost',  //should this be local for my machine?
    port: 5432, //the port for your database, 5432 is default for postgres
    max: 10, //how many cooncetions (queries) at one time
    idleTimeoutMillis: 30000 //30 seconds try to connect otherwise cancel
});

pool.on('connect', () => {
    console.log('Postgresql Connected');
});

pool.on('error', (error) => {
    console.log("error with Postgresql pool", error);
});

module.exports = pool;