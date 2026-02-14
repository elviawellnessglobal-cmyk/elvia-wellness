const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/Order");
const Product = require("../models/Product");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* ======================================
   RAZORPAY INSTANCE
====================================== */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ======================================
   CREATE PAYMENT ORDER
====================================== */
router.post("/create-order", userAuth, async (req, res) => {
  try {
    const { amount, cartItems, address } = req.body;

    if (!amount || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Invalid cart" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "kaeorn_" + Date.now(),
      notes: {
        userId: req.user._id.toString(),
        email: req.user.email,
        cart: JSON.stringify(cartItems),
        address: JSON.stringify(address),
      },
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.error("Razorpay create error:", err);
    res.status(500).json({ message: "Razorpay order failed" });
  }
});

/* ======================================
   WEBHOOK — REAL ORDER CREATION
   IMPORTANT: RAW BODY REQUIRED
====================================== */
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-razorpay-signature"];

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(req.body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.log("❌ Invalid webhook signature");
        return res.status(400).send("Invalid signature");
      }

      const event = JSON.parse(req.body.toString());

      if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;
        const notes = payment.notes || {};

        const cartItems = JSON.parse(notes.cart || "[]");
        const address = JSON.parse(notes.address || "{}");

        const validatedItems = [];

        for (const item of cartItems) {
          const product = await Product.findOne({
            productId: item.productId,
            isActive: true,
          });

          if (!product) continue;

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

        await Order.create({
          userEmail: notes.email,
          items: validatedItems,
          address,
          totalAmount,
          payment: {
            razorpayPaymentId: payment.id,
            razorpayOrderId: payment.order_id,
          },
          status: "Paid",
        });

        console.log("✅ ENTERPRISE ORDER CREATED VIA WEBHOOK");
      }

      if (event.event === "payment.failed") {
        console.log("❌ Payment failed event received");
      }

      res.json({ status: "ok" });
    } catch (err) {
      console.error("Webhook error:", err);
      res.status(500).send("Webhook failed");
    }
  }
);

module.exports = router;
