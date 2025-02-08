const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const { createDepartment, getDepartments, assignEmployees } = require("../controllers/managerController");

const router = express.Router();

router.post("/departments", authenticateToken, createDepartment);
router.get("/departments", authenticateToken, getDepartments);
router.post("/departments/:id/assign", authenticateToken, assignEmployees);

module.exports = router;
