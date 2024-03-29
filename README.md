# Employee Tracker
## Description
Employee Tracker is an application that allows users to track and manage an organization's departments, roles, and employees in a MySQL database via a command-line interface (CLI).

Technologies used by the application include the `mysql2`, `inquirer`, and `console.table` npm packages, as well as `Node.js` and `MySQL`. Detailed installation requirements, steps, and usage instructions are provided below.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
### Requirements
Before installing the application, be sure you have installed `Node.js` JavaScript runtime, `npm` package manager, and are  running a local `MySQL` server. For more information on these prerequisite technologies, see:
- `Node.js`: https://nodejs.org
- `npm`: https://www.npmjs.com,
- `MySQL`: https://www.mysql.com

### Steps
Step 1. Clone the project repo here: https://github.com/J1741/hw_12_employee_tracker

Step 2. Run the following command in the root of the project directory to install the application:
```
npm i
```

Step 3. Run the following command in the root of the project directory to create the `employee_management_db` database:
```
source db/schema.sql
```

Step 4. OPTIONAL: Run the following command in the root of the project directory to to seed the `employee_management_db` database:
```
source db/seeds.sql
```

## Usage
After you have completed the installation steps above, do the following to launch the Employee Tracker application:

Step 1. Open a terminal and navigate to the root of the project directory

Step 2. Run the following command there:
```
node server.js
```

Step 3. While the application is running, select menu options and follow the prompts in the CLI to view and manage departments, roles, and employees in the `employee_management_db`

Step 4. When you are finished running the application, hit CTRL-C on the keyboard. This will exit the Employee Tracker and return to a regular terminal prompt.

## License
Copyright (c) 2021 J1741

This software is licensed under the The MIT License.

## Contributing
Contributions to the Employee Tracker project are welcome!

The project repo can be forked here: https://github.com/J1741/hw_12_employee_tracker

## Demo Video
A demo of the application can be viewed here (NB: For best resolution, view the demo video in full screen): 
https://watch.screencastify.com/v/ny1DOYBFvzYtGh3F5n6Y

## Questions
Questions and inquiries about the Employee Tracker project can be directed to the developer via GitHub: https://github.com/J1741

Or via email: jseventeen41@gmail.com