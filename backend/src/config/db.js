const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  mongoose.set("strictQuery", true);
  
  const options = {
    retryWrites: true,
    w: 'majority',
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };
  
  await mongoose.connect(mongoUri, options);
  console.log("MongoDB connected successfully 🚀");
};

module.exports = connectDB;
