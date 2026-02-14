const Report = require("../models/Report");
const Post = require("../models/Post");

const createReport = async (req, res, next) => {
  try {
    const { targetUser, targetPost, reason } = req.body;
    if (!reason) {
      return res.status(400).json({ message: "Reason required" });
    }
    if (!targetUser && !targetPost) {
      return res.status(400).json({ message: "Target required" });
    }

    const report = await Report.create({
      reporter: req.user.id,
      targetUser,
      targetPost,
      reason,
    });

    if (targetPost) {
      await Post.findByIdAndUpdate(targetPost, { flagged: true });
    }

    return res.status(201).json(report);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createReport };
