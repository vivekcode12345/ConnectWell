const express = require("express");
const {
	register,
	resendOtp,
	verifyOtp,
	login,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

module.exports = router;
