const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res, next) => {
  try {
    const { group, content, anonymous } = req.body;
    if (!group || !content) {
      return res.status(400).json({ message: "Group and content required" });
    }

    const post = await Post.create({
      user: req.user.id,
      group,
      content,
      anonymous: Boolean(anonymous),
    });

    return res.status(201).json(post);
  } catch (err) {
    return next(err);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { group } = req.query;
    const filter = group ? { group } : {};

    const user = await User.findById(req.user.id).select("blockedUsers");
    const blocked = user ? user.blockedUsers : [];

    const posts = await Post.find({
      ...filter,
      flagged: false,
      $or: [{ user: req.user.id }, { user: { $nin: blocked } }],
    })
      .sort({ createdAt: -1 })
      .populate("user", "name");

    return res.json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createPost, getPosts };
