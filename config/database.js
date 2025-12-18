import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  if (connected) {
    console.log("Mongodb is connected");
    return;
  }

  if (!connected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      connected = true;
    } catch (error) {
      console.log(error);
    }
  }
};

export default connectDB;
