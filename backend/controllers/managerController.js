const db = require("../models/db");

exports.createDepartment = (req, res) => {
  if (req.user.role !== "Manager") return res.status(403).json({ message: "Unauthorized" });

  const { department_name, category_name, location, salary } = req.body;
  const sql = "INSERT INTO departments (department_name, category_name, location, salary, manager_id) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [department_name, category_name, location, salary, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error creating department" });
    res.status(201).json({ message: "Department created successfully" });
  });
};

exports.getDepartments = (req, res) => {
  if (req.user.role !== "Manager") return res.status(403).json({ message: "Unauthorized" });

  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  const offset = (page - 1) * limit;

  const sql = "SELECT * FROM departments LIMIT ? OFFSET ?";
  db.query(sql, [limit, offset], (err, results) => {
    if (err) return res.status(500).json({ message: "Error retrieving departments" });
    res.json(results);
  });
};

exports.assignEmployees = (req, res) => {
  if (req.user.role !== "Manager") return res.status(403).json({ message: "Unauthorized" });

  const { employees } = req.body;
  const department_id = req.params.id;

  const sql = "INSERT INTO employee_assignments (employee_id, department_id) VALUES ?";
  const values = employees.map(emp_id => [emp_id, department_id]);

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ message: "Error assigning employees" });
    res.status(201).json({ message: "Employees assigned successfully" });
  });
};
