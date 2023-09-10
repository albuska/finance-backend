const Pool = require("pg").Pool; 

const { PASSWORD_POSTGRESQL_DB } = process.env;

const pool = new Pool({
    user: "postgres",
    password: PASSWORD_POSTGRESQL_DB,
    host: "localhost",
    port: 5432,
    database: "finances_project"
});

module.exports = pool; 