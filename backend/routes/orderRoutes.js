const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

/* =========================================================
   CREATE ORDER  (CUSTOMER)
   ========================================================= */
router.post("/", userAuth, async (req, res) => {
  try {
    const items = req.body.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    const validatedItems = [];

    for (const item of items) {
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
      userEmail: req.user?.email || null, // ✅ SAFE SOURCE
      items: validatedItems,
      address: req.body.address || null, // string or object (legacy safe)
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

/* =========================================================
   USER – GET MY ORDERS
   ========================================================= */
router.get("/my-orders", userAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("My orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =========================================================
   USER – GET SINGLE ORDER
   ========================================================= */
router.get("/my-orders/:id", userAuth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Single order error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

/* =========================================================
   ADMIN – ALL ORDERS
   ========================================================= */
router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email name")
      .sort({ createdAt: -1 });

    const formatted = orders.map((order) => ({
      ...order.toObject(),
      customerEmail:
        order.userEmail ||
        order.user?.email ||
        "N/A",
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =========================================================
   ADMIN – SINGLE ORDER
   ========================================================= */
router.get("/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "email name");

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
  } catch (error) {
    console.error("Admin single order error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

/* =========================================================
   ADMIN – UPDATE STATUS
   ========================================================= */
router.put("/:id/status", adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

/* =========================================================
   ADMIN – DELETE ORDER
   ========================================================= */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
