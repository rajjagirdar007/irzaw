const mysql = require('mysql2');

const connection = mysql.createConnection({
    connectionLimit : 10,
    host: '127.0.0.1',
    user: 'mpengslocal',
    password: 'Password123',
    database: 'irzaw'
})

// Function to log actions to the audit_log table
function logAction(change) {
  const timestamp = new Date();
  var username = change.username;
  var action = change.change;
  // Insert a new record into the audit_log table
  connection.query(
    'INSERT INTO audit_log (username, action, timestamp) VALUES (?, ?, ?)',
    [username, action, timestamp],
    (error, results) => {
      if (error) {
        console.error('Failed to log action:', error);
      }
    }
  );
}

module.exports = logAction;

