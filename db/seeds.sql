INSERT INTO department (name)
VALUES ("Administration"),
  ("Customer Service"),
  ("Exploration"),
  ("Transportation");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 500000, 1),
  ("VP", 250000, 1),
  ("Service Manager", 80000, 2),
  ("Service Representative", 40000, 2),
  ("Cartographer", 150000, 3),
  ("Navigator", 75000, 3),
  ("Train Conductor", 60000, 4),
  ("Truck Driver", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julius", "Caesar", 1, DEFAULT), 
  ("Romulus", "Augustus", 2, 1), 
  ("Leader", "Snoke", 3, 2), 
  ("Kylo", "Ren", 4, 3), 
  ("Leo", "Tolstoy", 5, 2), 
  ("Anton", "Chekhov", 6, 5), 
  ("Neil", "Armstrong", 7, 2), 
  ("Buzz", "Aldrin", 8, 7);