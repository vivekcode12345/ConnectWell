const express = require("express");
const auth = require("../middleware/auth");
const { analyzeMessage, rewriteMessage } = require("../controllers/aiController");

const router = express.Router();

router.post("/tone", auth, analyzeMessage);
router.post("/rewrite", auth, rewriteMessage);

module.exports = router;
