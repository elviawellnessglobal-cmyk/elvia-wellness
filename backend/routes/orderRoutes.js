const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const adminAuth = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* ---------------- CREATE ORDER (SECURE) ---------------- */
router.post("/", userAuth, async (req, res) => {
  try {
    const validatedItems = [];

    for (const item of req.body.items) {
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

    // ✅ EMAIL SOURCE OF TRUTH
    const customerEmail = req.body.address?.email || null;
    const customerPhone = req.body.address?.phone || null;

    if (!customerEmail || !customerPhone) {
      return res.status(400).json({
        message: "Email and phone are required in address",
      });
    }

    const order = await Order.create({
      user: req.user || null,
      items: validatedItems,
      address: {
        ...req.body.address,
        email: customerEmail,
        phone: customerPhone,
      },
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

/* ---------------- USER: SINGLE ORDER ---------------- */
router.get("/my-orders/:id", userAuth, async (req, res) => {
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
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "email name");

  // ✅ NORMALIZED RESPONSE FOR ADMIN
  const safeOrders = orders.map((order) => ({
    ...order.toObject(),
    customerEmail:
      order.address?.email || order.user?.email || "N/A",
    customerPhone: order.address?.phone || "N/A",
  }));

  res.json(safeOrders);
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
      order.address?.email || order.user?.email || "N/A",
    customerPhone: order.address?.phone || "N/A",
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
