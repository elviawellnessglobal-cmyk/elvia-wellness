const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");
const EmailLog = require("../models/EmailLog");

/* =========================================================
   ADMIN – EMAIL ANALYTICS
   ========================================================= */
router.get("/email-logs", adminAuth, async (req, res) => {
  try {
    const logs = await EmailLog.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(logs);
  } catch (err) {
    console.error("Email analytics error:", err);
    res.status(500).json({ message: "Failed to fetch email logs" });
  }
});

module.exports = router;
