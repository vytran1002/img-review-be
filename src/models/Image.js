const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema({
  public_id: { type: String, required: true, unique: true },
  secure_url: { type: String, required: true },
  format: String,
  width: Number,
  height: Number,
  bytes: Number,

  originalname: String,

  likes: { type: Number, default: 0 },
  comments: [commentSchema],

  uploadDate: { type: Date, default: Date.now },
});

imageSchema.index({ uploadDate: -1 });

module.exports = mongoose.model("Image", imageSchema);
