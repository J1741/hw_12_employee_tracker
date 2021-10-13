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

// gets db action from user
function main () {
  inquirer.prompt([
    {
      type: "list",
      name: "dbAction",
      message: "Welcome to the employee management system! What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        new inquirer.Separator(),
      ], 
    }
  ]).then((answer) => {
    console.log("\x1b[36m%s\x1b[0m", `\n** Selected action: ${answer.dbAction} **\n`);
   
    // handle view all departments
    if (answer.dbAction === "View all departments") {
      viewAllDepartments();
    }

  });
}

// view all departments
function viewAllDepartments() {
  db.query("SELECT id,name FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    main();
  });
}

// runs the app
function init() {
  main();
}

init();