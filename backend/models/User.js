const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String, // email/password users

    googleId: String, // google users

    // 🔐 FORGOT PASSWORD OTP
    resetOtp: String,
    resetOtpExpiry: Date,

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
