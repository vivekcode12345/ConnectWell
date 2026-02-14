const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    anonymous: { type: Boolean, default: false },
    flagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
