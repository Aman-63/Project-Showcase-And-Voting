import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const exp= express();

exp.use(cors());
exp.use(express.json());

mongoose.connect(process.env.connectionURL).then(() =>{
    console.log("MongoDB connected successfully!!");
    const port =process.env.port || 5000;
    exp.listen(port, ()=>{
        console.log(`Server running on ${port}`);
    })
}).catch((err) =>{
    console.error("Database Connection failed");
    process.exit(1);
})