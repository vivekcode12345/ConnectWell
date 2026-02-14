const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");
const MoodLog = require("../models/MoodLog");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const groups = ["Mindful Habits", "Career Calm", "Family Care", "New Friends"];

const createMoodLogs = async (userId) => {
  const moods = ["happy", "calm", "stressed", "anxious", "happy", "tired"];
  const logs = moods.map((mood, index) => ({
    user: userId,
    mood,
    note: index % 2 === 0 ? "Demo check-in" : "",
  }));
  await MoodLog.insertMany(logs);
};

const createPosts = async (userA, userB) => {
  const posts = await Post.insertMany([
    {
      user: userA,
      group: groups[0],
      content: "Tried a 5-minute breathing break before work.",
      anonymous: false,
    },
    {
      user: userB,
      group: groups[1],
      content: "Anyone else setting gentle boundaries this week?",
      anonymous: true,
    },
  ]);

  await Comment.insertMany([
    {
      post: posts[0]._id,
      user: userB,
      content: "That sounds grounding. Thanks for sharing.",
    },
    {
      post: posts[1]._id,
      user: userA,
      content: "Yes! I am practicing saying no without guilt.",
    },
  ]);
};

const seed = async () => {
  dotenv.config();
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    MoodLog.deleteMany({}),
    Post.deleteMany({}),
    Comment.deleteMany({}),
  ]);

  const password = await bcrypt.hash(
    process.env.SEED_PASSWORD || "ConnectWell123",
    10
  );

  const [userA, userB] = await User.insertMany([
    { name: "Ava", email: "ava@example.com", password },
    { name: "Kai", email: "kai@example.com", password },
  ]);

  await createMoodLogs(userA._id);
  await createMoodLogs(userB._id);
  await createPosts(userA._id, userB._id);

  console.log("Seed complete");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});
