const express = require("express");
const auth = require("../middleware/auth");
const { createPost, getPosts } = require("../controllers/postController");

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getPosts);

module.exports = router;
