import express from "express";
import User from "../data/user.js";
import Project from "../data/project.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const exp= express.Router();

const authorization= (request, response, next)=> {
    const token =request.headers["authorization"]?.split(" ")[1];
    if(!token){
        return response.status(401).json({message:"You need to login first"});
    }
    try{
        const check=jwt.verify(token, process.env.JWT_PASS);
        request.user =check;
        next();
    } catch(err){
        response.status(403).json({message: "Request failed"});
    }
};

exp.post("/castVote/:projectId", authorization, async (request, response) =>{
    const {projectId} = request.params;
    const userId =request.user.id;

    try{
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).json({message:"User not found"});
        }

        if(user.votedData.some(id => id.toString() === projectId)){
            return response.status(400).json({message: "You already voted for this project.."})
        }

        user.votedData.push(projectId);
        await user.save();
        
        const project = await Project.findById(projectId);
        project.votes+=1;
        await project.save();

        response.json({message:"Voted successfully..."});

    } catch(err){
        response.status(500).json({message:"Error while voting"});
    }
});


export default exp;