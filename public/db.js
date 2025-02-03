const {Pool} = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usuarioPostgresql',
    password: 'PostgresqlPassword_123',
    port: 5432
});

module.exports = pool;