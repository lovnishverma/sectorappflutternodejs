const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Replace these values with your actual MySQL database credentials
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
});

app.use(bodyParser.json());

// // Create table if not exists
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS plots (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     mobileNumber VARCHAR(15) NOT NULL,
//     sector VARCHAR(50) NOT NULL,
//     plot VARCHAR(50) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL
//   )
// `;
// db.query(createTableQuery, (err) => {
//   if (err) {
//     console.error('Error creating table:', err);
//     throw err;
//   }
//   console.log('Table created or already exists');
// });

// Add a plot
app.post('/addPlot', (req, res) => {
  const { name, mobileNumber, sector, plot, price } = req.body;
  const query = 'INSERT INTO plots (name, mobileNumber, sector, plot, price) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, mobileNumber, sector, plot, price], (err, result) => {
    if (err) {
      console.error('Error adding plot:', err);
      res.status(500).send('Error adding plot');
    } else {
      console.log('Plot added successfully');
      res.status(200).send('Plot added successfully');
    }
  });
});

// Get all plots
app.get('/getAllPlots', (req, res) => {
  const query = 'SELECT * FROM plots';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching all plots:', err);
      res.status(500).send('Error fetching all plots');
    } else {
      console.log('All Plots:', results);
      res.status(200).json(results);
    }
  });
});

// Search for plots by sector
app.get('/searchPlots/:sector', (req, res) => {
  const sector = req.params.sector;
  const query = 'SELECT * FROM plots WHERE sector = ?';
  db.query(query, [sector], (err, results) => {
    if (err) {
      console.error('Error searching for plots:', err);
      res.status(500).send('Error searching for plots');
    } else {
      console.log('Plots found:', results);
      res.status(200).json(results);
    }
  });
});

// Endpoint to get available sectors
app.get('/getSectors', (req, res) => {
  const query = 'SELECT sector FROM plots'; // Adjust the query based on your table structure
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching sectors:', err);
      res.status(500).send('Error fetching sectors');
    } else {
      const sectors = results.map((result) => result.sector);
      console.log('Available Sectors:', sectors);
      res.status(200).json(sectors);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
