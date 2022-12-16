const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
  host: '155.248.231.129',
  user: 'root',
  password: 'gimhan1991',
  database: 'acme'
});

db.connect();

app.get('/users', (req,res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(50000, () => console.log('Server started'));