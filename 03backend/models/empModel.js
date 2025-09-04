import mongoose from "mongoose";

const empSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    images: [String]
},{timestamps : true})

const Emp = mongoose.model("Emp", empSchema);
export default Emp