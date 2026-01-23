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

    googleId: String,

    otp: String,
    otpExpiry: Date,

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
