const MoodLog = require("../models/MoodLog");
const { getWeeklyTrend, tipsByMood } = require("../utils/insights");

const createMoodLog = async (req, res, next) => {
  try {
    const { mood, note } = req.body;
    if (!mood) {
      return res.status(400).json({ message: "Mood required" });
    }

    const log = await MoodLog.create({ user: req.user.id, mood, note });
    const tip = tipsByMood[mood] || "Be kind to yourself today.";
    return res.status(201).json({ log, tip });
  } catch (err) {
    return next(err);
  }
};

const getMyMoods = async (req, res, next) => {
  try {
    const logs = await MoodLog.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(logs);
  } catch (err) {
    return next(err);
  }
};

const getWeeklyInsights = async (req, res, next) => {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const logs = await MoodLog.find({
      user: req.user.id,
      createdAt: { $gte: since },
    }).sort({ createdAt: 1 });

    const trend = getWeeklyTrend(logs);
    return res.json(trend);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createMoodLog, getMyMoods, getWeeklyInsights };
