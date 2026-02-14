const Comment = require("../models/Comment");

const createComment = async (req, res, next) => {
  try {
    const { postId, content } = req.body;
    if (!postId || !content) {
      return res.status(400).json({ message: "Post and content required" });
    }

    const comment = await Comment.create({
      post: postId,
      user: req.user.id,
      content,
    });

    return res.status(201).json(comment);
  } catch (err) {
    return next(err);
  }
};

const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: 1 })
      .populate("user", "name");

    return res.json(comments);
  } catch (err) {
    return next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only allow user to delete their own comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await Comment.findByIdAndDelete(id);
    return res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createComment, getCommentsByPost, deleteComment };
