const mysql = require('mysql')
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Papajoelee123',
    database: 'employeeTracker_DB'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    prompt()
});



const prompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'what would you like to do?',
            choices: [
                'Manage employees.',
                'Manage departments.',
                'Manage roles.',
            ],
            name: 'init'
        }
    ]).then((initResponse) => {
        console.log('1', initResponse);
        const response = initResponse.init;
        if (response === 'Manage employees.') {
            manageEmployee();
        } else if (response === 'Manage departments.') {
            manageDepartment()
        } else {
            manageRoles()
        }
    })
}

const manageEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees.',
                'Add employees.',
                'Remove employees.'
            ],
            name: 'employeeChoices'
        }
    ]).then(employeeResponse => {
        const response = employeeResponse.employeeChoices
        if (response === 'View all employees.') {
            console.log('\n TO DO: build function that reads employees from CRUD.');
            addEmployees();
        } else if (response === 'Add employees.') {
            console.log('\n TO DO: build function that writes employees from CRUD.');
        } else {
            console.log('\n TO DO: build function that deletes employees from CRUD.');
        }
    })
}

const manageDepartment = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments.',
                'Add departments.',
                'Remove departments.'
            ],
            name: 'departmentChoices'
        }
    ]).then(departmentResponse => {
        const response = departmentResponse.departmentChoices
        if (response === 'View all departments.') {
            console.log('\n TO DO: build function that reads departments from CRUD.');
        } else if (response === 'Add departments.') {
            console.log('\n TO DO: build function that writes departments from CRUD.');
        } else {
            console.log('\n TO DO: build function that deletes departments from CRUD.');
        }
    })
}

const manageRoles = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all roles.',
                'Add roles.',
                'Remove roles.'
            ],
            name: 'roleChoices'
        }
    ]).then(roleResponse => {
        const response = roleResponse.roleChoices
        if (response === 'View all roles.') {
            console.log('\n TO DO: build function that reads roles from CRUD.');
        } else if (response === 'Add roles.') {
            console.log('\n TO DO: build function that writes roles from CRUD.');
        } else {
            console.log('\n TO DO: build function that deletes roles from CRUD.');
        }
    })
}