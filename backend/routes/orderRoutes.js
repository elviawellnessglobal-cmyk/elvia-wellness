const express = require("express");
const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* ---------------- CREATE ORDER ---------------- */
router.post("/", userAuth, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user || null,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

/* ---------------- USER: ALL ORDERS ---------------- */
router.get("/my-orders", userAuth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const orders = await Order.find({ user: req.user }).sort({
    createdAt: -1,
  });

  res.json(orders);
});

/* ---------------- USER: SINGLE ORDER ---------------- */
router.get("/my-orders/:id", userAuth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user,
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

/* ---------------- ADMIN: ALL ORDERS ---------------- */
router.get("/", adminAuth, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

/* ---------------- ADMIN: ORDER DETAIL ---------------- */
router.get("/:id", adminAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

/* ---------------- ADMIN: UPDATE STATUS ---------------- */
router.put("/:id/status", adminAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.json(order);
});

/* ---------------- ADMIN: DELETE ---------------- */
router.delete("/:id", adminAuth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
