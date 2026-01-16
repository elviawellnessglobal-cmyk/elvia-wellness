const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");
const sendOrderStatusEmail = require("../utils/sendEmail");

/* =====================================================
   CREATE ORDER (PUBLIC) – PAYMENT PAGE
===================================================== */
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      items,
      totalAmount,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      customerName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      items,
      totalAmount,
      status: "Pending",
    });

    await order.save();

    // 📧 OPTIONAL: confirmation email (safe)
    if (order.email) {
      await sendOrderStatusEmail(order);
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

/* =====================================================
   GET ALL ORDERS (ADMIN)
===================================================== */
router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =====================================================
   GET SINGLE ORDER (ADMIN)
===================================================== */
router.get("/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Fetch order error:", err);
    res.status(500).json({ message: "Failed to load order" });
  }
});

/* =====================================================
   UPDATE ORDER STATUS (ADMIN) + EMAIL
===================================================== */
router.put("/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🚫 prevent duplicate email if same status
    if (order.status === status) {
      return res.json(order);
    }

    order.status = status;
    await order.save();

    // 📧 SEND EMAIL ON STATUS CHANGE
    if (order.email) {
      await sendOrderStatusEmail(order);
    }

    res.json(order);
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

/* =====================================================
   DELETE ORDER (ADMIN)
===================================================== */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
