const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

let currentDepartments = [];
let currentRoles = [];
let managerChoices = [];

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
    if (answer.dbAction === "Add an employee") {
      addNewEmployee();
    }

    // handle update an employee role

  });
}

// displays all departments in db
function viewAllDepartments() {
  db.query("SELECT id AS 'department id', name AS 'department name' FROM department", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
      main();
    } else {
      // pretty print results
      console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success!`)
      console.table(results);
    }
    main();
  });
}

// displays all roles in db
function viewAllRoles() {
  db.query("SELECT r.title AS 'job title', r.id AS 'role id', d.name AS 'department',r.salary FROM role r LEFT OUTER JOIN department d ON r.department_id = d.id", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
      main();
    } else {
      // pretty print results
      console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success!`)
      console.table(results);
    }
    main(); 
  });
}

// displays all employees in db
function viewAllEmployees() {
  db.query("SELECT ea.id AS 'employee id', ea.first_name AS 'first name', ea.last_name AS 'last name', r.title AS 'job title', d.name AS 'department', r.salary, CONCAT(eb.first_name, ' ', eb.last_name) AS 'manager' FROM employee ea LEFT OUTER JOIN employee eb ON ea.manager_id = eb.id LEFT OUTER JOIN role r ON ea.role_id=r.id LEFT OUTER JOIN department d ON d.id=r.department_id", function (err, results) {
    // handle error
    if (err) {
      console.log(err);
      console.log(`\x1b[93;41m%s\x1b[0m`, `\n** Something went wrong, please try again **`);
      main();
    } else {
      // pretty print results
      console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success!`)
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
        // pretty print results
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
    // add new role to db
    //  ** promisify to allow .then method and .then chaining **
    db.promise().query(`SELECT id FROM department WHERE name='${answer.newRoleDepartmentName}'`).then(result => {
      // insert new role into db
      db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES('${answer.newRoleTitle}', ${answer.newRoleSalary}, ${result[0][0].id})`).then(result =>
      // pretty print results
      {
        console.log(`\x1b[93;42;1m%s\x1b[0m`, `Success!`);
        console.log(`\x1b[92m%s\x1b[0m`, `New role added to database:\n - title: ${answer.newRoleTitle}\n - salary: ${answer.newRoleSalary}\n - id: ${result[0].insertId}\n`)
        main();
      })
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
function addNewEmployee() {
  console.log("\n** in addNewEmployee function **\n");
  // ** REFACTORING for new employee **
  // get new employee info
  inquirer.prompt([
    {
      type: "input",
      name: "newEmployeeFirstName",
      message: "Please enter the new employee's first name:",
    },
    {
      type: "input",
      name: "newEmployeeLastName",
      message: "Please enter the new employee's last name:",
    },
    {
      type: "list",
      name: "newEmployeeRole",
      message: "Please select a role for the new employee:",
      choices: getCurrentRoles(),
    },
    {
      type: "list",
      name: "newEmployeeManager",
      message: "Please select a manager for the new employee:",
      choices: getManagerChoices(), 
    }
  ]).then(answer => {
    console.log("answers are:\n", answer);

    // add new employee to database
    db.promise().query(`SELECT id FROM role WHERE title='${answer.newEmployeeRole}'`).then(result => {
      db.promise().query(`INSERT INTO employee (first_name, last_name, role_id) VALUES('${answer.newEmployeeFirstName}', '${answer.newEmployeeLastName}', ${result[0][0].id})`).then(result => {
        console.log("insert employee result:", result);
        main();
      })
    })
  }); 
} 

// helper function to get current roles
function getCurrentRoles() {
  db.query(`SELECT id, title FROM role`, function (err, results) {
    if (err) {
      console.log(err);
      console.log("Could not get roles from db");
    } else {
      // add each role title to currentRoles array
      for (let i = 0; i < results.length; i++) {
        currentRoles.push(results[i].title);
      }
    }
  });
  return currentRoles;
}

// helper function to get manager choices
function getManagerChoices () {
  db.query(`SELECT id,CONCAT(first_name, ' ', last_name) AS employeeFullName FROM employee`, function (err, results) {
    if (err) {
      console.log(err);
      console.log("Could not get employees from db");
    } else {
      // add each employee full name to managerChoices array
      for (let i = 0; i < results.length; i++) {
        managerChoices.push(results[i].employeeFullName);
      }
    }
  });
  return managerChoices;
}

// updates an employee role in db

// welcomes user and runs app
function init() {
  console.log("\x1b[93;104m%s\x1b[0m", "\n/// Welcome to the employee management system! ///\n");
  main();
}

init();