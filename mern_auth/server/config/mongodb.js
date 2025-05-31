import mongoose from "mongoose";

function connectDB() {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log("Database Connection Failed:", err.message));
}

export default connectDB;
