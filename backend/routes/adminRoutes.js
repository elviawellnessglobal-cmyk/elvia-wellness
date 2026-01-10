const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

/**
 * ADMIN LOGIN
 * POST /api/admin/login
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check credentials from .env
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid admin credentials",
    });
  }

  // Create token
  const token = jwt.sign(
    { role: "admin", email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Admin login successful",
    token,
  });
});

module.exports = router;
