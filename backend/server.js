console.log("SERVER FILE LOADED");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* ---------------- CORS (FIXED) ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://elvia-wellness.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ PRE-FLIGHT FIX
app.options("*", cors());

app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

/* ---------------- HEALTH ---------------- */
app.get("/", (req, res) => {
  res.send("Backend running");
});

/* ---------------- DB ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
