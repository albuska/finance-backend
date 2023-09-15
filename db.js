const { Pool } = require('pg');

const { POSTGRES_URL } = process.env;


const pool = new Pool({
    connectionString: POSTGRES_URL + "?sslmode=require",
});

pool.connect((error) => {
    if (error) throw error
    console.log('Success connection to DB');
})

module.exports = pool; 