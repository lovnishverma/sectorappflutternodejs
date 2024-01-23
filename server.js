const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'smilingwalls.in',
  user: 'smilingw_sector',
  password: '67.225.161.168',
  database: 'smilingw_sector',
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
