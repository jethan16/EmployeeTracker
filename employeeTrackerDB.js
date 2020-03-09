const mysql = require('mysql')
const inquirer = require('inquirer')
const cTable = require('console.table')
// const Employee = (require('./Employee'))
// const managerData = require('../EmployeeTracker/managers.json')
// const employeeData = require('../EmployeeTracker/eployees.json')

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
    console.log(`
    _______  __   __  _______  ___      _______  __   __  _______  _______    __   __  _______  __    _  _______  _______  _______  ______   
   |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |  |  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |  
   |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|  |       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||  
   |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___   |       ||       ||       ||       ||   | __ |   |___ |   |_||_ 
   |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|  |       ||       ||  _    ||       ||   ||  ||    ___||    __  |
   |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___   | ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  | |
   |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|  |_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  |_|
   `);
    init()
});

function init() {


    inquirer.prompt({
        name: 'initChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Manage employees.',
            'Manage departments.',
            'Manage roles.'
        ]
    }).then(results => {
        if (results.initChoice === 'Manage employees.') {
            manageEmployees()
        } else if (results.initChoice === 'Manage departments.') {
            manageDepartments()
        } else {
            manageRoles()
        }
    })
}

// Management section

const manageEmployees = () => {
    inquirer.prompt({
        name: 'employeeChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees.',
            'Add a new employee.',
            'Remove an existing employee.',
            'Update an employee.',
            'Remove all employees.',
            '<--- back'
        ]
    }).then(results => {
        if (results.employeeChoice === 'View all employees.') {
            viewEmployees()
        } else if (results.employeeChoice === 'Add a new employee.') {
            addEmployee()
        } else if (results.employeeChoice === 'Remove an existing employee.') {
            removeEmployee()
        } else if (results.employeeChoice === 'Update an employee.') {
            updateEmployee()
        } else if (results.employeeChoice === 'Remove all employees.') {
            inquirer.prompt({
                name: 'confirmation',
                type: 'list',
                message: 'Are you sure?',
                choices: ['yes', 'no']
            }).then(results => {
                if (results.confirmation === 'yes') {
                    connection.query(
                        "DELETE FROM employees",
                        function () {
                            console.log(`\n All employees have been removed from database. \n`),
                                init()
                        }
                    )
                } else {
                    init()
                }
            })
        } else {
            init()
        }
    })
}
const manageDepartments = () => {
    inquirer.prompt({
        name: 'deptChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments.',
            'View employees by department.',
            'Add a new department.',
            'Remove an existing department.',
            '<-- Back.'
        ]
    }).then(results => {
        if (results.deptChoice === 'View all departments.') {
            viewDepartment()
        } else if (results.deptChoice === 'Add a new department.') {
            addDepartment()
        } else if (results.deptChoice === 'View employees by department.') {
            viewByDept()
        } else if (results.deptChoice === 'Remove an existing department.') {
            removeDepartment()
        } else {
            init()
        }
    })
}

const manageRoles = () => {
    inquirer.prompt({
        name: 'roleChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all roles.',
            'Add a new role.',
            'Remove an existing role.',
            '<-- Back.'
        ]
    }).then(results => {
        if (results.roleChoice === 'View all roles.') {
            viewRole()
        } else if (results.roleChoice === 'Add a new role.') {
            addRole()
        } else if (results.roleChoice === 'Remove an existing role.') {
            removeRole()
        } else {
            init()
        }
    })
}

// View Section

const viewEmployees = () => {
    connection.query(
        `SELECT id, full_name, roles, salary, manager FROM
       employees LEFT JOIN roles 
       ON employees.roles = roles.title;`,
        function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res)
            init()
        }
    )
}

const viewDepartment = () => {
    connection.query(
        "SELECT * FROM departments",
        function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res)
            init()
        }
    )
}

const viewRole = () => {
    connection.query(
        "SELECT * FROM roles",
        function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res)
            init()
        }
    )
}

// Add section

function addEmployee() {
    connection.query(
        "SELECT * FROM roles",
        function (err, res) {
            if (err) {
                throw err;
            }
            inquirer.prompt([
                {
                    name: 'employeeName',
                    type: 'input',
                    message: 'What is their first and last name?',
                    validate: function (name) {
                        if (name === '' || name === ' ') {
                            console.log(' \n Employee name cannot be empty \n');
                        } else {
                            return true;
                        }
                    }
                },
                {
                    name: 'employeeRole',
                    type: 'list',
                    message: 'What is their role?',
                    choices: res.map(role => role.title),
                },
                {
                    name: 'isManager',
                    type: 'list',
                    message: 'Are they a manager?',
                    choices: ['yes', 'no']
                }]
            ).then(results => {
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        full_name: results.employeeName,
                        roles: results.employeeRole
                    },
                    console.log(`\n ${results.employeeName} has been added to the database \n`),

                    function (err) {
                        if (err) {
                            throw err;
                        }
                    }
                )
                if (results.isManager === 'yes') {
                    function manangerUpdate(results) {
                        connection.query(
                            "UPDATE employees SET ? WHERE ?",
                            [{
                                is_manager: true,
                            },
                            { full_name: results.employeeName }]

                        )
                        init()
                    }
                    manangerUpdate(results)
                } else {
                    connection.query(
                        "SELECT * FROM employees WHERE is_manager = true", function (err, res) {
                            if (res.length === 0) {
                                console.log(`\n 'There are no existing manager's. \n`);
                                init()
                            } else {
                                inquirer.prompt({
                                    name: 'managerOption',
                                    type: 'list',
                                    choices: function () {
                                        const managerArr = []
                                        for (var i = 0; i < res.length; i++) {
                                            managerArr.push(res[i].full_name)
                                        }
                                        return managerArr
                                    },
                                    message: 'Who is their manager?',
                                }).then(results2 => {
                                    // console.log('1',results2.managerOption);
                                    // console.log('2', res);
                                    var managerPos;
                                    for (var i = 0; i < res.length; i++) {
                                        if (results2.managerOption === res[i].full_name) {
                                            managerPos = res[i]
                                        }
                                    }
                                    // console.log('3', managerPos.full_name);
                                    connection.query(
                                        "UPDATE employees SET ? WHERE ?",
                                        [{ manager: managerPos.full_name },
                                        { full_name: results.employeeName }],
                                        function () { }
                                    )


                                    init()
                                })
                            }
                        });
                }
            })

        }
    )
}

function addDepartment() {
    inquirer.prompt([
        {
            name: 'deptName',
            type: 'input',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(results => {
        connection.query(
            "INSERT INTO departments SET ?",
            {
                dep_name: results.deptName
            }
        )
        init()
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: 'roleName',
            type: 'input',
            message: 'What is the name of the role you would like to add?'
        },
    ]).then(results => {
        inquirer.prompt({
            name: 'newSalary',
            type: 'input',
            message: `What is the desired salary for ${results.roleName}?`
        }).then(results2 => {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: results.roleName,
                    salary: results2.newSalary
                }
            )
            init()
        })
    })
}

// Remove Section

function removeEmployee() {

    connection.query(
        "SELECT * FROM employees",
        function (err, res) {
            if (err) {
                throw err;
            }
            inquirer.prompt(
                {
                    name: 'employeeName',
                    type: 'list',
                    message: 'Who would you like to remove?',
                    choices: res.map(role => role.full_name),
                }).then(results => {
                    connection.query(
                        "DELETE FROM employees WHERE ?",
                        { full_name: results.employeeName },
                        console.log(`\n ${results.employeeName} has been removed from database. \n`),
                        function () {
                        })
                    init()
                })
        })
}

function removeDepartment() {
    connection.query(
        "SELECT * FROM departments",
        function (err, res) {
            if (err) {
                throw err;
            }
            inquirer.prompt(
                {
                    name: 'departmentName',
                    type: 'list',
                    message: 'Which department would you like to remove?',
                    choices: res.map(title => title.dep_name)
                }).then(results => {
                    connection.query(
                        "DELETE FROM departments WHERE ?",
                        { dep_name: results.departmentName },
                        console.log(`\n ${results.departmentName} has been removed from database. \n`),
                        function () {
                        })
                    init()
                })
        })
}

function removeRole() {
    connection.query(
        "SELECT * FROM roles",
        function (err, res) {
            if (err) {
                throw err;
            }
            inquirer.prompt(
                {
                    name: 'roleName',
                    type: 'list',
                    message: 'Which role would you like to remove?',
                    choices: res.map(role => role.title)
                }).then(results => {
                    connection.query(
                        "DELETE FROM roles WHERE ?",
                        { title: results.roleName },
                        console.log(`\n ${results.roleName} has been removed from database. \n`),
                        function () {
                        })
                    init()
                })
        })
}

// Udpate Section

function updateEmployee() {
    connection.query(
        "SELECT * FROM employees",
        function (err, res) {
            if (err) {
                throw err;
            }
            inquirer.prompt(
                {
                    name: 'employeeName',
                    type: 'list',
                    message: `Which employee would you like to update?`,
                    choices: res.map(role => role.full_name)
                }
            ).then(results => {
                inquirer.prompt({
                    name: 'updateChoice',
                    type: 'list',
                    message: `What about ${results.employeeName} would you like to update?`,
                    choices: [
                        `${results.employeeName}'s name.`,
                        `${results.employeeName}'s role.`,
                    ]
                }).then(results2 => {
                    if (results2.updateChoice === `${results.employeeName}'s name.`) {
                        updateName(results.employeeName)
                    } else if (results2.updateChoice === `${results.employeeName}'s role.`) {
                        updateRole(results.employeeName)
                    }
                })
            })
        })
}

function updateName(name) {
    inquirer.prompt({
        name: 'updateName',
        type: 'input',
        message: `What should ${name}'s new name be?`
    }).then(results => {
        connection.query(
            "UPDATE employees SET ? WHERE ?",
            [{ full_name: results.updateName },
            { full_name: name }],
            function () {

            }
        )
        init()
    })
}

function updateRole(name) {
    connection.query(
        "SELECT * FROM roles",
        function (err, res) {
            if (err) { throw err; }
            inquirer.prompt({
                name: 'updateRole',
                type: 'list',
                message: 'What should their new role be?',
                choices: res.map(role => role.title)
            }).then(results2 => {
                connection.query(
                    "UPDATE employees SET ? WHERE ?",
                    [{ roles: results2.updateRole },
                    { full_name: name }],
                    function (err) { if (err) { throw err; } }
                )
                init()
            })
        }
    )
}
