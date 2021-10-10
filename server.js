const inquirer = require('inquirer');
const mysql = require('mysql2');

function main() {
  // prompt user for db action
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
        "Exit the application",
        new inquirer.Separator(),
      ],
    }
  ]).then(answer => {

    // log selected action
    console.log("Selected action is:", answer.dbAction);

    // acknowledge exit
    if (answer.dbAction === "Exit the application") {
      console.log("\x1b[36m%s\x1b[0m", "\n----\nExiting .. Bye!");
    }

  });
}

main();