const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

const serverString = process.env.DB_SERVER || 'localhost\\SQLEXPRESS';
const dbName = process.env.DB_NAME || 'master';

// Using the exact ODBC Driver that passed the msnodesqlv8 connection test
const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=${serverString};Database=${dbName};Trusted_Connection=yes;TrustServerCertificate=yes;`;

const poolPromise = new sql.ConnectionPool({
    connectionString: connectionString
})
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server successfully via ODBC 17 / Windows Auth!');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed! Bad Config: ', err.message || err);
        throw err;
    });

module.exports = {
    sql, poolPromise
};