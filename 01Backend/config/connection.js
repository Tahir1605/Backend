import mongoose from "mongoose";

const connection = async () => {
     try {

       await mongoose.connect(process.env.MONGODB_URL) 
       console.log("Database connected Successfully")
     } catch (err) {
        console.log("Database connection failed", err.message);
     }
}

export default connection


// import mongoose from "mongoose";

// const connection = () => {
//     mongoose.connect(process.env.MONGODB_URL)
//     .then(() => console.log("Database connected successfully"))
//     .catch((err) => console.log("Database connection failed",err.message))
// }

// export default connection