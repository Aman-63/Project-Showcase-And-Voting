import express from "express";
import jwt from "jsonwebtoken";
import Project from "../data/project.js";
import dotenv from "dotenv";

const exp= express.Router();

dotenv.config();

const authorization= (request, response, next)=> {
    const token =request.headers["Authorization"]?.split(" ")[1];
    if(!token){
        return response.status(401).json({message:"You need to login first"});
    }
    try{
        const check=jwt.verify(token, process.env.jwtPass);
        request.user =check;
        next();
    } catch(err){
        response.status(403).json({message: "Request failed"});
    }
};


exp.post("/submit", authorization, async(request, response) =>{
    const {title, description, repoLink} = request.body;
    try{
        const newProject = await Project.create({
            title,
            description,
            techStack,
            imageUrl,
            videoUrl,
            repoLink,
            liveLink,
            submittedBy:request.user.user
        });
        response.status(201).json(newProject);
    } catch(err){
        response.status(500).json({message: "Submission failed.."});
    }
});

exp.post("/", async(request, response)=>{
    try{
        const projects= await Project.find();
        response.json(projects);
    } catch(err){
        response.status(500).json({message: "Error loading projects.."});
    }
});

export default exp;

