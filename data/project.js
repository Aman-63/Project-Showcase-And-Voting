import mongoose, { Mongoose } from "mongoose";

const projectInfo = new Mongoose.schema({
    title:{type: String, required:true},
    description:{type: String, required: true},
    techStack:{type: String},
    imageUrl:{type: String, required:true},
    videoUrl:{type: String, required:true},
    repoLink:{type: String, required:true},
    liveLink:{type: String},
    votes:{type:Number, default:0},
    submittedBy:{type:String, required: true }

});

export default mongoose.model("Project", projectInfo);