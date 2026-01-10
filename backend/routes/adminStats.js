const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const Order = require("../models/Order");

router.get("/stats", adminAuth, async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const todayOrders = await Order.countDocuments({
    createdAt: { $gte: start },
  });

  const todayRevenueAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: start } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  const pendingOrders = await Order.countDocuments({
    status: "Pending",
  });

  res.json({
    todayOrders,
    todayRevenue: todayRevenueAgg[0]?.total || 0,
    pendingOrders,
  });
});

module.exports = router;
