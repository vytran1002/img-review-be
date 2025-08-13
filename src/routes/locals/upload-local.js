const express = require("express");
const multer = require("multer");
const Image = require("../../models/local/Image-local");
const router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route upload ảnh
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const webPath = path.posix.join("uploads", req.file.filename);

    const image = new Image({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: webPath,
    });

    await image.save();
    res.json({
      success: true,
      image,
      url: `${req.protocol}://${req.get("host")}/${webPath}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
