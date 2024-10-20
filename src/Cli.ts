import inquirer from 'inquirer';
import { table } from 'console';

import type department from './interfaces/department';
import type employee from './interfaces/employee';
import type role from './interfaces/role';

import { pool, connectToDb } from "./connection.js";

await connectToDb();

class Cli {
    // method for the first prompt wich is to choose between several options
    async start() {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['view all employees', 'view all roles', 'view all departments', 'add employee', 'add role', 'add department'],
            },
        ]);
        switch (answers.action) {
            case 'view all employees':
                await this.viewAllEmployees();
                this.start();
                break;

            case 'view all roles':
                await this.viewAllRoles();
                this.start();
                break;

            case 'view all departments':
                await this.viewAllDepartments();
                this.start();
                break;

            case 'add employee':
                await this.addEmployee();
                this.start();
                break;

            case 'add role':
                await this.addRole();
                this.start();
                break;

            case 'add department':
                await this.addDepartment();
                this.start();
                break;

            default:
                console.log('Invalid action');
                this.start();
                break;
        }
    }

    // method to add an employee
    async addEmployee() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee\'s first name?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee\'s last name?',
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the employee\'s role?',
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is the employee\'s manager?',
            },
        ]);

        const employee: employee = {
            firstName: answers.firstName,
            lastName: answers.lastName,
            role: answers.role,
            manager: answers.manager,
        };

        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';

        const managerResult = await pool.query('SELECT id FROM employee WHERE first_name = $1 AND last_name = $2', [employee.manager.split(' ')[0], employee.manager.split(' ')[1]]);
        const managerId = managerResult.rows.length > 0 ? managerResult.rows[0].id : null;

        const roleResult = await pool.query('SELECT id FROM role WHERE title = $1', [employee.role]);
        const roleId = roleResult.rows.length > 0 ? roleResult.rows[0].id : null;

        await pool.query(sql, [employee.firstName, employee.lastName, roleId, managerId]);

        return table(await this.viewAllEmployees());

    }

    // method to add a role
    async addRole() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'input',
                name: 'department',
                message: 'What department is the role in?',
            },
        ]);

        const role: role = {
            title: answers.title,
            salary: parseFloat(answers.salary),
            department: answers.department,
        };

        const sql = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';

        const departmentResult = await pool.query('SELECT id FROM department WHERE name = $1', [role.department]);
        const departmentId = departmentResult.rows.length > 0 ? departmentResult.rows[0].id : null;

        await pool.query(sql, [role.title, role.salary, departmentId]);

        return table(await this.viewAllRoles());

    }

    // method to add a department
    async addDepartment() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?',
            },
        ]);

        const department: department = {
            name: answers.name,
        };

        const sql = 'INSERT INTO department (name) VALUES ($1)';

        await pool.query(sql, [department.name]);

        return table(await this.viewAllDepartments());
    }

    // method to view all employees
    async viewAllEmployees() {
        // SQL query to select all employees
        const sql = 'SELECT * FROM employee;';

        // capturing the employees from the database
        const employees = await pool.query(sql);

        // displaying the employees in a table format
        return table(employees.rows);
    }

    // method to view all roles
    async viewAllRoles() {
        const sql = 'SELECT * FROM role;';

        const roles = await pool.query(sql);

        return table(roles.rows);
    }

    // method to view all departments
    async viewAllDepartments() {
        const sql = 'SELECT * FROM department;';

        const departments = await pool.query(sql);

        return table(departments.rows);
    }
}

export default Cli;
