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
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/* ---------- REQUEST OTP ---------- */
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email required" });

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ success: true });
  } catch (err) {
    console.error("Request OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

/* ---------- VERIFY OTP & LOGIN ---------- */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpiry < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
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
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

/* ---------- GOOGLE LOGIN (CUSTOMERS) ---------- */
router.post("/google", async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name, googleId });
    } else if (!user.googleId) {
      user.googleId = googleId;
      if (!user.name) user.name = name;
      await user.save();
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Google login failed" });
  }
});

module.exports = router;
