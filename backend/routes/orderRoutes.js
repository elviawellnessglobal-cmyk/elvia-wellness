const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* ---------------- CREATE ORDER (LEGACY SAFE) ---------------- */
router.post("/", userAuth, async (req, res) => {
  try {
    const validatedItems = [];

    for (const item of req.body.items || []) {
      const product = await Product.findOne({
        productId: item.productId,
        isActive: true,
      });

      if (!product) {
        return res.status(400).json({
          message: `Invalid product: ${item.productId}`,
        });
      }

      validatedItems.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: item.image,
      });
    }

    const totalAmount = validatedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      user: req.user || null,
      userEmail: req.user?.email || null, // safe source
      items: validatedItems,
      address: req.body.address || null, // string or object (legacy)
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

/* ---------------- USER: ALL ORDERS ---------------- */
router.get("/my-orders", userAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

/* ---------------- ADMIN: ALL ORDERS ---------------- */
router.get("/", adminAuth, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "email name")
    .sort({ createdAt: -1 });

  const normalized = orders.map((order) => ({
    ...order.toObject(),
    customerEmail:
      order.userEmail ||
      order.user?.email ||
      "N/A",
  }));

  res.json(normalized);
});

/* ---------------- ADMIN: ORDER DETAIL ---------------- */
router.get("/:id", adminAuth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email name"
  );

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({
    ...order.toObject(),
    customerEmail:
      order.userEmail ||
      order.user?.email ||
      "N/A",
  });
});

/* ---------------- ADMIN: UPDATE STATUS ---------------- */
router.put("/:id/status", adminAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.json(order);
});

/* ---------------- ADMIN: DELETE ORDER ---------------- */
router.delete("/:id", adminAuth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
