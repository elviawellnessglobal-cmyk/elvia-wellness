const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/**
 * GET all active products (Frontend)
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/**
 * GET single product by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
});

/**
 * ADD product (Admin)
 */
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Product creation failed" });
  }
});

/**
 * UPDATE product (Admin)
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Product update failed" });
  }
});

/**
 * DELETE product (Admin)
 */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: "Product deletion failed" });
  }
});

module.exports = router;

