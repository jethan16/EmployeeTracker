const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Papajoelee123',
    database: 'employeeTracker_DB'
})

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    // init()
});

class Employee {
    constructor(name, role) {
        this.name = name
        this.role = role
    }

    getName() {
        return this.name
    }

    getRole() {
        return this.role
    }

    getRoleId() {
        var rolesIdArr = []

        connection.query(
            "SELECT id FROM roles WHERE ?",
            {
                title: this.role
            },
            function(res) {
                rolesIdArr.push(res)
            }
        )

        connection.query(
            "UPDATE employees SET ? WHERE ?",
            {
                role_id: rolesIdARR
            },
            {
                full_name: this.name
            }
        )
    }
}

module.exports = Employee;