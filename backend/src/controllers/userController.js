const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("name email createdAt");
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) {
      return res.status(400).json({ message: "You cannot block yourself" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { blockedUsers: id } },
      { new: true }
    ).select("blockedUsers");

    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

const unblockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { blockedUsers: id } },
      { new: true }
    ).select("blockedUsers");

    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getProfile, blockUser, unblockUser };
