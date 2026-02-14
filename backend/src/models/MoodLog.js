const mongoose = require("mongoose");

const moodLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: {
      type: String,
      required: true,
      enum: ["happy", "sad", "stressed", "anxious", "calm", "angry", "tired"],
    },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MoodLog", moodLogSchema);
