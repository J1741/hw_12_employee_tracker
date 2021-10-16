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

    // handle view all employees
    if (answer.dbAction === "View all employees") {
      viewAllEmployees();
    }

    // handle add a department
    // handle add role
    // handle add an employee
    // handle update an employee role

  });
}

// gets all departments in db
function viewAllDepartments() {
  db.query("SELECT id AS 'department id', name AS 'department name' FROM department", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;104m%s\x1b[0m`, `\n** Something went wrong, please try again **`)
    } else {
      // pretty print results
      console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success:`)
      console.table(results);
    }
    main();
  });
}

// gets all roles in db
function viewAllRoles() {
  db.query("SELECT r.title AS 'job title', r.id AS 'role id', d.name AS 'department',r.salary FROM role r JOIN department d ON r.department_id = d.id", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;104m%s\x1b[0m`, `\n** Something went wrong, please try again **`)
    } else {
      // pretty print results
      console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success:`)
      console.table(results);
    }
    main(); 
  });
}

// gets all employees in db
function viewAllEmployees() {
  db.query("SELECT ea.id,ea.first_name,ea.last_name,CONCAT(eb.first_name, ' ', eb.last_name) AS 'manager' FROM employee ea LEFT OUTER JOIN employee eb ON ea.manager_id = eb.id", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;104m%s\x1b[0m`, `\n** Something went wrong, please try again **`)
    } else {
      // pretty print results
      console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success:`)
      console.table(results);
    }
    main(); 
  });
}

// adds a new department to db
// adds a new role to db
// adds an employee to db
// updates an employee role in db

// welcomes user and runs app
function init() {
  console.log("\x1b[95m%s\x1b[0m", "\n/// Welcome to the employee management system! ///\n");
  main();
}

init();