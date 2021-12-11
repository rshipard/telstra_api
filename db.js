const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    database: 'telstra_vehicles',
    host: 'localhost',
    port: parseInt(process.env.DBPORT) || 5432
})

module.exports = pool