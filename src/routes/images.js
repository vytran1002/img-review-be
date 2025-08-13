const express = require("express");
const Image = require("../models/Image");
const router = express.Router();

// GET /api/images - lấy toàn bộ ảnh
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadDate: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/images/:id/like - tăng like cho ảnh
router.post("/:id/like", async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json({ success: true, likes: image.likes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/images/:id/comment - thêm comment cho ảnh
router.post("/:id/comment", async (req, res) => {
  try {
    const { text } = req.body;
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { text } } },
      { new: true }
    );
    res.json({ success: true, comments: image.comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
