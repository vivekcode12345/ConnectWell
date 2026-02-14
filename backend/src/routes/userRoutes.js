const express = require("express");
const auth = require("../middleware/auth");
const { getProfile, blockUser, unblockUser } = require("../controllers/userController");

const router = express.Router();

router.get("/me", auth, getProfile);
router.post("/block/:id", auth, blockUser);
router.post("/unblock/:id", auth, unblockUser);

module.exports = router;
