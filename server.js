import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import auth from "./routes/loginSignup.js";
import proj from "./routes/projectSubmission.js";
import vote from "./routes/voteProject.js";
dotenv.config();

const exp= express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

exp.use(express.static(path.join(__dirname, "frontEnd")));

exp.use(cors());
exp.use(express.json());

exp.use("/api/auth", auth);
exp.use("/api/project", proj);
exp.use("/api/vote", vote);

mongoose.connect(process.env.CONNECTION_URL).then(() =>{
    console.log("MongoDB connected successfully!!");
    const port =process.env.PORT || 5000;
    exp.listen(port, ()=>{
        console.log(`Server running on http://localhost:${port}`);
    })
}).catch((err) =>{
    console.error("Database Connection failed");
    process.exit(1);
})