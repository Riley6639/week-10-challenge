INSERT INTO department (name) 
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Marketing'),
       ('Human Resources'),
       ('IT');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 80000, 1),
       ('Sales Associate', 50000, 1),
       ('Software Engineer', 90000, 2),
       ('Data Analyst', 70000, 2),
       ('Financial Analyst', 60000, 3),
       ('Marketing Specialist', 55000, 4),
       ('HR Manager', 75000, 5),
       ('IT Support', 45000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('jon', 'doe', 1, 8),
       ('jane', 'smith', 1, 1),
       ('mike', 'johnson', 2, 1),
       ('sara', 'connor', 3, 3),
       ('luke', 'skywalker', 4, 3),
       ('leia', 'organa', 5, 5),
       ('han', 'solo', 6, 6),
       ('chewbacca', 'wookie', 7, 7);