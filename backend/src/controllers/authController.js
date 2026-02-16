const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOtpEmail, sendWelcomeEmail } = require("../utils/emailService");

const OTP_EXPIRY_MINUTES = 10;

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const generateOtp = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      otpHash,
      otpExpiresAt,
    });

    const sendResult = await sendOtpEmail(email, name, otp);
    if (!sendResult.success) {
      await User.deleteOne({ _id: user._id });
      return res
        .status(500)
        .json({ message: "Failed to send OTP email. Try again." });
    }

    return res.status(201).json({
      message: "OTP sent to your email.",
      email,
    });
  } catch (err) {
    return next(err);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const otp = generateOtp();
    user.otpHash = await bcrypt.hash(otp, 10);
    user.otpExpiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );
    await user.save();

    const sendResult = await sendOtpEmail(email, user.name, otp);
    if (!sendResult.success) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP email. Try again." });
    }

    return res.json({ message: "OTP resent to your email." });
  } catch (err) {
    return next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      const token = createToken(user);
      return res.json({
        message: "Email already verified.",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    }

    if (!user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({ message: "OTP not available" });
    }

    if (Date.now() > new Date(user.otpExpiresAt).getTime()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const match = await bcrypt.compare(otp, user.otpHash);
    if (!match) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(email, user.name);

    const token = createToken(user);
    return res.json({
      message: "Email verified successfully.",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isVerified === false) {
      return res
        .status(403)
        .json({ message: "Please verify your email with the OTP." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { register, resendOtp, verifyOtp, login };
