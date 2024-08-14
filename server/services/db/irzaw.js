const mysql = require('mysql2');

const conn = mysql.createConnection({
    connectionLimit : 10,	
    host: '127.0.0.1',
    user: 'mpengslocal',
    password: 'Password123',
    database: 'irzaw'
})

conn.connect((err) => {
    if (err) {
        console.error(`error connection: ${err}`);
        return
    }
    console.log('Connected to irzaw DB!');
})

module.exports = conn;
