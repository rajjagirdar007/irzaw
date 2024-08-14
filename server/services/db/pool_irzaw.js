const mysql = require('mysql2');

const conn = mysql.createPool({
    connectionLimit : 10,	
    host: '127.0.0.1',
    user: 'mpengslocal',
    password: 'Password123',
    database: 'irzaw'
})

module.exports = conn.promise();
