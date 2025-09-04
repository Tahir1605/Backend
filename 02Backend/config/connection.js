import mongoose from "mongoose";

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected Successfully")
        
    } catch (error) {
        console.log("Database could not connect" , error.message)
    }  
}

export default connectDB