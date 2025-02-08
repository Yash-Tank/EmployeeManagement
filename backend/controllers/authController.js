const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password, gender, hobbies, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
console.log("signup", req.body);
  const sql = "INSERT INTO users (first_name, last_name, email, password, gender, hobbies, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [first_name, last_name, email, hashedPassword, gender, hobbies, role], (err, result) => {
    if (err) return res.status(500).json({ message: "Error registering user" });
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: "User not found" });
    const user = results[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, role: user.role });
  });
};
