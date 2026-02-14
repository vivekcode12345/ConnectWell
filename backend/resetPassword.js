const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = "vivek7148verma@gmail.com";
    const newPassword = "Vivek@123";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (user) {
      console.log("✅ Password reset successfully!");
      console.log("Email:", email);
      console.log("New Password:", newPassword);
    } else {
      console.log("❌ User not found");
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

resetPassword();
