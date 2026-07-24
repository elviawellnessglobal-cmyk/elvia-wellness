const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    /* ---------- ACCOUNT ---------- */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    userEmail: {
      type: String,
    },

    /* ---------- ITEMS ---------- */
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    /* ---------- DELIVERY ADDRESS ---------- */
    address: {
      fullName: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    /* ---------- PAYMENT ---------- */
    payment: {
      razorpayPaymentId: {
        type: String,
        unique: true,
        sparse: true,
      },

      razorpayOrderId: {
        type: String,
      },
    },

    /* ---------- AMOUNTS ---------- */
    totalAmount: {
      type: Number,
    },

    originalAmount: {
      type: Number,
      // Amount before coupon discount
    },

    /* ---------- INFLUENCER COUPON ---------- */
    couponCode: {
      type: String,
      default: null,
    },

    commissionRecorded: {
      type: Boolean,
      default: false,
      // Flips to true when commission is successfully sent
    },

    /* ---------- ORDER STATUS ---------- */
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);