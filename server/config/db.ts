import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", async () => {
      console.log("Database connected");
    });

    if (!process.env.MONGO_URI) throw new Error("Please add Mongo URI in env");

    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.log("Failed to connect to the Database");
  }
};

export default connectDB;
