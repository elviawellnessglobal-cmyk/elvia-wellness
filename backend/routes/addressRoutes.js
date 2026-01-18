const express = require("express");
const User = require("../models/User");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* -------- GET ADDRESSES -------- */
router.get("/", userAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(req.user);
  res.json(user.addresses || []);
});

/* -------- ADD ADDRESS -------- */
router.post("/", userAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(req.user);

  const address = req.body;

  if (address.isDefault) {
    user.addresses.forEach((a) => (a.isDefault = false));
  }

  user.addresses.push(address);
  await user.save();

  res.json(user.addresses);
});

module.exports = router;
