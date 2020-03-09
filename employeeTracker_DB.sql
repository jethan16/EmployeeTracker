DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE departments (
DeptID INTEGER,
dep_name VARCHAR(30),
PRIMARY KEY (DeptID)
);	

CREATE TABLE roles (
rolesId INTEGER AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL,
-- FOREIGN KEY (DeptID) REFERENCES departments(DeptID),
PRIMARY KEY (rolesId)
);	

CREATE TABLE employees (
id INTEGER AUTO_INCREMENT NOT NULL,
full_name VARCHAR(30),
roles VARCHAR(30),
-- FOREIGN KEY (rolesId ) REFERENCES roles(rolesId),
is_manager BOOLEAN DEFAULT FALSE,
manager VARCHAR(30),
PRIMARY KEY (id)
);	

INSERT INTO roles (title, salary)
VALUES ('Sales Person', 55000), ('Accountant', 12000),('Software Engineer', 85000),('Front End Developer', 75000), ('Back End Developer',85000),('Lawyer',120000);

INSERT INTO departments (dep_name)
VALUES ('Sales'), ('Finance'), ('Development'), ('Legal');
-- SELECT * FROM employees;

SELECT * FROM employees;

SELECT * FROM roles;

SELECT id, full_name, roles, salary, manager FROM
employees LEFT JOIN roles 
ON employees.roles = roles.title;

SELECT id, full_name, dep_name FROM
employees RIGHT JOIN departments 
ON employees.roles = roles.title;

-- SELECT * FROM departments;

-- DELETE FROM roles;

-- DELETE FROM employees;

-- SELECT * FROM employees;