const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const imageSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  uploadDate: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
});

module.exports = mongoose.model("Image", imageSchema);
