const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12679034',
  password: 'fbFQSm5G5e',
  database: 'sql12679034',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
  // Your further database operations here
});

// Optionally, you can close the connection after using it
db.end();
