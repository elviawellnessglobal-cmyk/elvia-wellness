const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const Order = require("../models/Order");

router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const revenueAgg = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    res.json({
      totalOrders,
      pendingOrders,
      totalRevenue,
    });
  } catch (err) {
    console.error("Dashboard stats error", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

module.exports = router;
