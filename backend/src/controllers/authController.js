const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/OTP");
const { generateOTP, sendOTPEmail, sendWelcomeEmail } = require("../utils/emailService");

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Check if OTP already exists for this email (ongoing verification)
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      // Delete old OTP and create new one
      await OTP.deleteOne({ email });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create OTP record with user data
    await OTP.create({
      email,
      otp,
      userData: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Send OTP email
    await sendOTPEmail(email, otp, name);

    return res.status(201).json({
      message: "OTP sent to your email. Please verify to complete registration.",
      email,
      requiresVerification: true,
    });
  } catch (err) {
    return next(err);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(404).json({ message: "OTP not found. Please register again." });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "OTP has expired. Please register again." });
    }

    // Check attempts
    if (otpRecord.attempts >= otpRecord.maxAttempts) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: "Maximum attempts exceeded. Please register again." });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      const remaining = otpRecord.maxAttempts - otpRecord.attempts;
      return res.status(401).json({
        message: `Invalid OTP. ${remaining} attempts remaining.`,
      });
    }

    // OTP is valid - create user
    const { name, email: userData_email, password } = otpRecord.userData;
    const user = await User.create({
      name,
      email: userData_email,
      password,
    });

    // Delete OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    // Send welcome email
    await sendWelcomeEmail(userData_email, name);

    // Create JWT token
    const token = createToken(user);

    return res.status(201).json({
      message: "Email verified successfully. Account created!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return next(err);
  }
};

const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(404).json({ message: "No pending verification found. Please register again." });
    }

    // Generate new OTP
    const newOTP = generateOTP();
    otpRecord.otp = newOTP;
    otpRecord.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    otpRecord.attempts = 0; // Reset attempts
    await otpRecord.save();

    // Send OTP email
    const userName = otpRecord.userData?.name || '';
    await sendOTPEmail(email, newOTP, userName);

    return res.json({
      message: "OTP sent to your email.",
      email,
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

module.exports = { register, verifyOTP, resendOTP, login };
