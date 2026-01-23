const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/sendOtp");

const router = express.Router();

/* ---------- HELPERS ---------- */
function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ---------- REQUEST OTP ---------- */
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    // 🔒 DO NOT overwrite if OTP still valid
    if (user.otp && user.otpExpiry > new Date()) {
      return res.json({ success: true });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ success: true });
  } catch (err) {
    console.error("OTP request error:", err);
    res.status(500).json({ message: "OTP failed" });
  }
});

/* ---------- VERIFY OTP ---------- */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      !user.otp ||
      user.otp !== String(otp).trim() ||
      user.otpExpiry < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ CLEAR OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

module.exports = router;
