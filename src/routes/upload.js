const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const router = express.Router();

const streamifier = require("streamifier");
const { cloudinary } = require("../config/cloudinary");

const upload = multer({ storage: multer.memoryStorage() });

function uploadBufferToCloudinary(buffer, folder = "image-review-app") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder }, // tuỳ chọn: đặt folder trên Cloudinary
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // không có file?
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }

    const result = await uploadBufferToCloudinary(req.file.buffer);

    const image = new Image({
      originalname: req.file.originalname,
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });

    await image.save();

    return res.json({
      success: true,
      image,
      url: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
