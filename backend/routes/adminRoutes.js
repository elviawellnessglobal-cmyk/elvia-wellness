const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* ---------------- ADMIN LOGIN ---------------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

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
