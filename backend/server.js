console.log("SERVER FILE LOADED");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/* ---------------- ROUTES ---------------- */
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

/* ---------------- APP ---------------- */
const app = express();

/* ---------------- CORS (FIXED + FINAL) ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://elvia-wellness.vercel.app",
  "https://kaeorn-wellness.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

/* ---------------- API ROUTES ---------------- */
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

/* ---------------- DATABASE ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
