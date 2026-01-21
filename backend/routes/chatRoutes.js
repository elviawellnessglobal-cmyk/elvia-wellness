const express = require("express");
const Chat = require("../models/Chat");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/* USER: GET MY CHAT */
router.get("/my", userAuth, async (req, res) => {
  const chat = await Chat.findOne({ user: req.user });
  res.json(chat || null);
});

/* USER: SEND MESSAGE */
router.post("/send", userAuth, async (req, res) => {
  const { message } = req.body;

  let chat = await Chat.findOne({ user: req.user });

  if (!chat) {
    chat = new Chat({
      user: req.user,
      messages: [{ sender: "user", text: message }],
    });
  } else {
    chat.messages.push({ sender: "user", text: message });
  }

  await chat.save();
  res.json(chat);
});

/* ADMIN: GET ALL CHATS */
router.get("/admin", adminAuth, async (req, res) => {
  const chats = await Chat.find()
    .populate("user", "name email")
    .sort({ updatedAt: -1 });

  res.json(chats);
});

/* ADMIN: GET SINGLE CHAT */
router.get("/admin/:id", adminAuth, async (req, res) => {
  const chat = await Chat.findById(req.params.id).populate(
    "user",
    "name email"
  );
  res.json(chat);
});

/* ADMIN: REPLY */
router.post("/admin/reply/:id", adminAuth, async (req, res) => {
  const { text } = req.body;

  const chat = await Chat.findById(req.params.id);
  chat.messages.push({ sender: "admin", text });

  await chat.save();
  res.json(chat);
});

/* ADMIN: MARK RESOLVED */
router.post("/admin/resolve/:id", adminAuth, async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  chat.status = "resolved";
  await chat.save();
  res.json(chat);
});

/* ADMIN: DELETE CHAT (ONLY IF RESOLVED) */
router.delete("/admin/:id", adminAuth, async (req, res) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  if (chat.status !== "resolved") {
    return res
      .status(400)
      .json({ message: "Resolve chat before deleting" });
  }

  await chat.deleteOne();
  res.json({ success: true });
});

module.exports = router;
