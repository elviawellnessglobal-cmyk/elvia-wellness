const express = require("express");
const router = express.Router();
const razorpay = require("../utils/razorpay");
const userAuth = require("../middleware/userAuth");

/* CREATE RAZORPAY ORDER */
router.post("/create-order", userAuth, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount missing" });
    }

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.error("Razorpay create order error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});

module.exports = router;
