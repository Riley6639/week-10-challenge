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
                this.viewAllEmployees();
                break;

            case 'view all roles':
                table(await this.viewAllRoles());
                this.start(); // Restart the CLI after viewing roles
                break;

            case 'view all departments':
                table(await this.viewAllDepartments());
                this.start(); // Restart the CLI after viewing departments
                break;

            case 'add employee':
                await this.addEmployee();
                this.start(); // Restart the CLI after adding employee
                break;

            case 'add role':
                await this.addRole();
                this.start(); // Restart the CLI after adding role
                break;

            case 'add department':
                await this.addDepartment();
                this.start(); // Restart the CLI after adding department    
                break;

            default:
                console.log('Invalid action');
                await this.start();
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
        return employee;
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
        return role;
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

        await pool.query('INSERT INTO department (name) VALUES ($1)', [department.name]);
        table(await this.viewAllDepartments());
        return department;
    }

    // method to view all employees
    async viewAllEmployees() {
        // SQL query to select all employees
        const sql = 'SELECT * FROM employee;';

        // capturing the employees from the database
        const employees = await pool.query(sql);

        // displaying the employees in a table format
        table(employees.rows);
        
        // restarting the CLI
        this.start(); 
    }

    // method to view all roles
    async viewAllRoles() {
        const roles = await pool.query('SELECT * FROM role;');
        return roles.rows;
    }

    // method to view all departments
    async viewAllDepartments() {
        const departments = await pool.query('SELECT * FROM department;');
        return departments.rows;
    }
}

export default Cli;
