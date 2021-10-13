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

// gets db action from user
function main() {
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

    // handle view all roles
    if (answer.dbAction === "View all roles") {
      viewAllRoles();
    }

  });
}

// gets all departments in db
function viewAllDepartments() {
  db.query("SELECT id AS 'department id', name AS 'department name' FROM department", function (err, results) {
    if (err) {
      console.log(err);
      console.log(`\x1b[97;104m%s\x1b[0m`, `\n** Something went wrong, please try again **`)
    } else {
      // pretty print results
      console.log(`\x1b[97;42;1m%s\x1b[0m`, `Success:`)
      console.table(results);
    }
    main();
  });
}

// gets all roles in db
function viewAllRoles() {
  db.query("select r.title as 'job title', r.id as 'role id', d.name as 'department',r.salary from role r join department d on r.department_id = d.id", function (err, results) {
    if (err) {
      console.log(err);
      console.log(`\x1b[97;104m%s\x1b[0m`, `\n** Something went wrong, please try again **`)
    } else {
      // pretty print results
      console.log(`\x1b[97;42;1m%s\x1b[0m`, `Success:`)
      console.table(results);
    }
    main(); 
  });
}

// welcomes user and runs app
function init() {
  console.log("\x1b[95m%s\x1b[0m", "\n/// Welcome to the employee management system! ///\n");
  main();
}

init();