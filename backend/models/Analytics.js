const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    totalRevenue: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    failedPayments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
