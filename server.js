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
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("** Database connection successful **");
});

// gets db action from user
function main () {
  inquirer.prompt([
    {
      type: "list",
      name: "dbAction",
      message: "Please select one of the following options:",
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
   
    // handle view all departments
    if (answer.dbAction === "View all departments") {
      viewAllDepartments();
    }

  });
}

// view all departments
function viewAllDepartments() {
  db.query("SELECT id as 'department id',name as 'department name' FROM department", function (err, results) {
    //
    if (err) {
      console.log(err);
    }
    console.log(`\x1b[97;42m%s\x1b[0m`, `\nSuccess:`)
    console.table(results);

    // return to main menu
    main();

  });
}

// runs the app
function init() {
  console.log("\x1b[95m%s\x1b[0m", "\n/// Welcome to the employee management system! ///\n");
  main();
}

init();