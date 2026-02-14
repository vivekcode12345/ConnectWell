const express = require("express");
const auth = require("../middleware/auth");
const { createComment, getCommentsByPost, deleteComment } = require("../controllers/commentController");

const router = express.Router();

router.post("/", auth, createComment);
router.get("/post/:postId", auth, getCommentsByPost);
router.delete("/:id", auth, deleteComment);

module.exports = router;
