# EmployeeManagement


# npm i in both frontend and backend



# this project uses mysql

#  http://localhost:5000/auth/signup use this backend route to create your self a manager through postman 

# OR

# Directly add your credintials to backend table



# this are two query 
# 1 

SELECT * FROM users 
JOIN employee_assignments ON users.id = employee_assignments.employee_id
JOIN departments ON employee_assignments.department_id = departments.id
WHERE departments.category_name = 'IT' 
AND departments.location LIKE 'A%';


# 2

SELECT * FROM users 
JOIN employee_assignments ON users.id = employee_assignments.employee_id
JOIN departments ON employee_assignments.department_id = departments.id
WHERE departments.category_name = 'Sales'
ORDER BY users.first_name DESC;


## this are 3 table

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    gender ENUM('Male', 'Female', 'Other'),
    hobbies TEXT,
    role ENUM('Employee', 'Manager') NOT NULL
);



CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100),
    category_name VARCHAR(100),
    location VARCHAR(100),
    salary DECIMAL(10,2),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE CASCADE
);



CREATE TABLE employee_assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    department_id INT,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);
