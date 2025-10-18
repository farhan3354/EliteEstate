import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected and started : ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
  //   try {
  //     const db = mongoose
  //       .connect(process.env.MongoDB_URL)
  //       .then(() => console.log("Mongo DB connected successfully"));
  //   } catch (error) {
  //     console.log("Server error", error);
  //   }
};

export default ConnectDB;
