const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'hellothere',
    database: 'employee_management_db'
  }
);

// handle error, acknowledge connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting:", err.stack);
    return;
  }
  console.log("** Connected to employee_management_db **");
});