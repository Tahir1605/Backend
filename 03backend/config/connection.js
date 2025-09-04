import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed", error.message)
    }
}

export default connectDB