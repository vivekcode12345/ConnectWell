const express = require("express");
const auth = require("../middleware/auth");
const { createMoodLog, getMyMoods, getWeeklyInsights } = require("../controllers/moodController");

const router = express.Router();

router.post("/", auth, createMoodLog);
router.get("/", auth, getMyMoods);
router.get("/weekly", auth, getWeeklyInsights);

module.exports = router;
