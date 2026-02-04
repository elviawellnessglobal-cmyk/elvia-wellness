const mongoose = require("mongoose");

const EmailLogSchema = new mongoose.Schema(
  {
    orderId: String,
    email: String,
    status: String,
    subject: String,
    sent: Boolean,
    error: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailLogHook", EmailLogSchema);
