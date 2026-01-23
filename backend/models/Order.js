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
      type: String, // ✅ logged-in account email
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
      email: String, // ✅ delivery email
      phone: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    totalAmount: Number,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
