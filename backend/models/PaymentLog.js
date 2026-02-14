const mongoose = require("mongoose");

const paymentLogSchema = new mongoose.Schema(
  {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    amount: Number,
    status: String,
    signatureValid: Boolean,
    ip: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentLog", paymentLogSchema);
