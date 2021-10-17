const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

let currentDepartments = [];

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
    console.log("dbAction is:", answer);
   
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
    if (answer.dbAction === "Add a department") {
      addNewDepartment();
    }

    // handle add role
    if (answer.dbAction === "Add a role") {
      addNewRole();
    }

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
      console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
      main();
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
  db.query("SELECT r.title AS 'job title', r.id AS 'role id', d.name AS 'department',r.salary FROM role r LEFT OUTER JOIN department d ON r.department_id = d.id", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
      main();
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
  db.query("SELECT ea.id AS 'employee id', ea.first_name AS 'first name', ea.last_name AS 'last name', r.title AS 'job title', d.name AS 'department', r.salary, CONCAT(eb.first_name, ' ', eb.last_name) AS 'manager' FROM employee ea LEFT OUTER JOIN employee eb ON ea.manager_id = eb.id JOIN role r ON ea.role_id=r.id JOIN department d ON d.id=r.department_id", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
      main();
    } else {
      // pretty print results
      console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success:`)
      console.table(results);
    }
    main(); 
  });
}

// adds a new department to db
function addNewDepartment() {
  console.log("\n ** IN addNewDepartment function **\n");
  // get new dept info
  inquirer.prompt([
    {
      type: "input",
      name: "newDept",
      message: "Please enter a name for the new department:",
    }
  ]).then(answer => {
    // add new department to db
    db.query(`INSERT INTO department (name) VALUES('${answer.newDept}')`, function (err, results) {
      // handle error
      if (err) {
        console.log(err);
        console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
        main();
      } else {
        // pretty print confirmation
        console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success!`)
        console.log(`\x1b[92m%s\x1b[0m`, `New department added to database:\n - name: ${answer.newDept}\n - id: ${results.insertId}\n`);
        main();
      }
    })
  });
}

// adds a new role to db
function addNewRole() {
  console.log("\n ** IN addNewRole function **\n");
  // get new role info
  inquirer.prompt([
    {
      type: "input",
      name: "newRoleTitle",
      message: "Please enter a title for the new role:",
    },
    {
      type: "input",
      name: "newRoleSalary",
      message: "Please enter a salary for the new role:",
    },
    {
      type: "list",
      name: "newRoleDepartmentName",
      message: "Please select a department for the new role:",
      choices: getCurrentDepartments(),
    }
  ]).then(answer => {
    // ** check department name provided by user **
    console.log("** department name is: **", answer.newRoleDepartmentName);
    
    // get id of new role department
    let newRoleDepartmentId = db.query(`SELECT id FROM department WHERE name='${answer.newRoleDepartmentName}'`, function (err, result) {
      if (err) {
        console.log(err);
      } 
      console.log("** department id is: **");
      console.log(result);
      console.log(result[0].id);
      return result[0].id;
    });

    // ** TODO: refactor getting department id above, as this returns undefined: **
    console.log(newRoleDepartmentId);

    // add new role to db
    db.query(`INSERT INTO role (title, salary, department_id) VALUES('${answer.newRoleTitle}', ${answer.newRoleSalary}), ${newRoleDepartmentId}`, function (err, results) {
      // handle error
      if (err) {
        console.log(err);
        console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
        main();
      } else {
        // pretty print results
        console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success!`)
        console.log(results);
        main();
      }
    })
  });
}

// helper function to get current departments in db
function getCurrentDepartments() {
  db.query(`SELECT id, name FROM department`, function (err, results) {
    if (err) {
      console.log(err);
      console.log("Could not get departments from db");
    } else {
      // add each department name to currentDepartments array
      for (let i = 0; i < results.length; i++) {
        currentDepartments.push(results[i].name);
      }
    }
  });
  return currentDepartments;
}

// adds an employee to db
// updates an employee role in db

// welcomes user and runs app
function init() {
  console.log("\x1b[93;104m%s\x1b[0m", "\n/// Welcome to the employee management system! ///\n");
  main();
}

init();