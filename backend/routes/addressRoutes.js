const express = require("express");
const Address = require("../models/Address");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* ======================================================
   GET USER ADDRESSES
   ====================================================== */
router.get("/", userAuth, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user }).sort({
      createdAt: -1,
    });

    res.json(addresses);
  } catch (err) {
    console.error("Get addresses error:", err);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});

/* ======================================================
   ADD ADDRESS
   ====================================================== */
router.post("/", userAuth, async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(address);
  } catch (err) {
    console.error("Add address error:", err);
    res.status(400).json({ message: "Failed to add address" });
  }
});

/* ======================================================
   DELETE ADDRESS
   ====================================================== */
router.delete("/:id", userAuth, async (req, res) => {
  try {
    await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Delete address error:", err);
    res.status(400).json({ message: "Failed to delete address" });
  }
});

module.exports = router;
