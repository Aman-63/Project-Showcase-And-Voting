import mongoose from "mongoose";

const userInfo = new mongoose.Schema(
    {
        username:{type: String, required:true, unique: true},
        password:{type: String, required:true},
        votedData:[{type: mongoose.Schema.Types.ObjectId, ref: "project"}]
    }
);

export default mongoose.model("User", userInfo);