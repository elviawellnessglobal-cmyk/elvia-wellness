const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/* ==========================================
   ADMIN PAYMENT ANALYTICS
========================================== */
router.get("/analytics", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ status: "Paid" });

    const revenueData = await Order.aggregate([
      { $match: { status: "Paid" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = await Order.aggregate([
      {
        $match: {
          status: "Paid",
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const monthlySales = await Order.aggregate([
      { $match: { status: "Paid" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json({
      totalOrders,
      paidOrders,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      todayRevenue: todaySales[0]?.total || 0,
      monthlySales,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Analytics failed" });
  }
});

module.exports = router;
