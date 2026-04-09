const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth"); // your existing middleware

/* GET ALL — public, only published */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/* GET ALL — admin, includes drafts */
router.get("/admin/all", adminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/* GET SINGLE by slug */
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blog" });
  }
});

/* CREATE — admin only */
router.post("/", adminAuth, async (req, res) => {
  try {
    const exists = await Blog.findOne({ slug: req.body.slug });
    if (exists) return res.status(400).json({ error: "Slug already exists" });

    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error creating blog" });
  }
});

/* UPDATE — admin only */
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error updating blog" });
  }
});

/* DELETE — admin only */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error deleting blog" });
  }
});

module.exports = router;