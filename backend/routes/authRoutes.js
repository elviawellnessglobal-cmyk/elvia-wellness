const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/sendOtp");

const router = express.Router();

/* ---------- HELPERS ---------- */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/* =====================================================
   SEND OTP (LOGIN)
   POST /api/auth/forgot-password
===================================================== */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ success: true });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Unable to send code" });
  }
});

/* =====================================================
   VERIFY OTP & LOGIN
   POST /api/auth/verify-otp
===================================================== */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (
      !user ||
      user.otp !== otp ||
      !user.otpExpiry ||
      user.otpExpiry < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
});

module.exports = router;
