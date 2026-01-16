const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");
const sendEmail = require("../utils/sendEmail");

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

    // 📧 ORDER CONFIRMATION EMAIL
    if (email) {
      await sendEmail(
        email,
        "Order Confirmed – ELVIA WELLNESS",
        `
          <h2>Thank you for your order 🤍</h2>
          <p>Your order <b>#${order._id
            .toString()
            .slice(-6)
            .toUpperCase()}</b> has been placed successfully.</p>
          <p>We will notify you once it is shipped.</p>
          <br/>
          <p>— ELVIA WELLNESS</p>
        `
      );
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
   UPDATE ORDER STATUS (ADMIN) + EMAIL ON SHIPPED
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

    order.status = status;
    await order.save();

    // 📧 EMAIL WHEN SHIPPED
    if (status === "Shipped" && order.email) {
      await sendEmail(
        order.email,
        "Your Order Has Been Shipped 🚚",
        `
          <h2>Your order is on the way!</h2>
          <p>Hi ${order.customerName || "Customer"},</p>
          <p>Your order <b>#${order._id
            .toString()
            .slice(-6)
            .toUpperCase()}</b> has been <b>SHIPPED</b>.</p>
          <p>We’ll notify you once it’s delivered.</p>
          <br/>
          <p>— ELVIA WELLNESS</p>
        `
      );
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
