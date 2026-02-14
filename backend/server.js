console.log("SERVER FILE LOADED");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/* ---------------- ROUTES ---------------- */
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const addressRoutes = require("./routes/addressRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminEmailRoutes = require("./routes/adminEmailRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminAnalyticsRoutes = require("./routes/adminAnalyticsRoutes");


/* ---------------- APP ---------------- */
const app = express();


/* ---------------- CORS ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://elvia-wellness.vercel.app",
  "https://kaeorn-wellness.vercel.app",
  "https://kaeorn.com",
  "https://www.kaeorn.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.error("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

/* ======================================
   WEBHOOK MUST BE BEFORE express.json()
====================================== */
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

/* ---------------- BODY PARSER ---------------- */
app.use(express.json());

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

/* ---------------- API ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminEmailRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminAnalyticsRoutes);

/* ---------------- DATABASE ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
