const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const Order = require("../models/Order");
const PaymentLog = require("../models/PaymentLog");
const Analytics = require("../models/Analytics");
const generateInvoice = require("../services/invoiceService");

router.post("/razorpay", express.raw({ type: "*/*" }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.body)
    .digest("hex");

  const isValid = signature === expectedSignature;

  const event = JSON.parse(req.body);

  if (!isValid) {
    return res.status(400).send("Invalid signature");
  }

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    const order = await Order.create({
      userEmail: payment.email,
      items: [],
      totalAmount: payment.amount / 100,
      status: "Paid",
    });

    generateInvoice(order);

    await PaymentLog.create({
      razorpayOrderId: payment.order_id,
      razorpayPaymentId: payment.id,
      amount: payment.amount / 100,
      status: "Paid",
      signatureValid: true,
      ip: req.ip,
    });

    await Analytics.findOneAndUpdate(
      {},
      {
        $inc: { totalRevenue: payment.amount / 100, totalOrders: 1 },
      },
      { upsert: true }
    );
  }

  if (event.event === "payment.failed") {
    await Analytics.findOneAndUpdate(
      {},
      { $inc: { failedPayments: 1 } },
      { upsert: true }
    );
  }

  res.json({ status: "ok" });
});

module.exports = router;
