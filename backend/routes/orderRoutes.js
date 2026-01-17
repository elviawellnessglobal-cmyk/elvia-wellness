const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");
const sendOrderStatusEmail = require("../utils/sendEmail");

/* CREATE ORDER (PUBLIC) */
router.post("/", async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      status: "Pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

/* GET ALL ORDERS (ADMIN) */
router.get("/", adminAuth, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

/* GET SINGLE ORDER */
router.get("/:id", adminAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
});

/* UPDATE STATUS + SEND EMAIL */
router.put("/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Not found" });

    const previousStatus = order.status;
    order.status = status;
    await order.save();

    // Respond immediately
    res.json(order);

    // Send email ONLY if status changed
    if (order.email && previousStatus !== status) {
      sendOrderStatusEmail(order);
    }
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

/* DELETE ORDER */
router.delete("/:id", adminAuth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
