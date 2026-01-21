const express = require("express");
const Chat = require("../models/Chat");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

/* USER: GET MY CHAT */
router.get("/my", userAuth, async (req, res) => {
  const chat = await Chat.findOne({ user: req.user });
  res.json(chat || null);
});

/* USER: SEND MESSAGE (TEXT + IMAGE) */
router.post(
  "/send",
  userAuth,
  upload.single("image"),
  async (req, res) => {
    const { message } = req.body;

    let imageUrl = null;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        { folder: "kaeorn-support" }
      );
      imageUrl = uploadRes.secure_url;
    }

    let chat = await Chat.findOne({ user: req.user });

    const newMessage = {
      sender: "user",
      text: message || "",
      image: imageUrl,
    };

    if (!chat) {
      chat = new Chat({
        user: req.user,
        messages: [newMessage],
      });
    } else {
      chat.messages.push(newMessage);
    }

    await chat.save();
    res.json(chat);
  }
);

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

/* ADMIN: DELETE CHAT */
router.delete("/admin/:id", adminAuth, async (req, res) => {
  const chat = await Chat.findById(req.params.id);

  if (!chat)
    return res.status(404).json({ message: "Chat not found" });

  if (chat.status !== "resolved")
    return res
      .status(400)
      .json({ message: "Resolve chat before deleting" });

  await chat.deleteOne();
  res.json({ success: true });
});

module.exports = router;
