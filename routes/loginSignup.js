import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../data/user";
import dotenv from "dotenv";


dotenv.config();

const exp= express.Router();

exp.post("/signup", async(request, response) =>{
    const {username, password} =request.body;
    const exstngUser = await User.findOne({username});
    if(exstngUser){
        return response.status(400).json({error: 'Username already exists'});
    }
    const encrypt= await bcrypt.hash(password,10);
    const newUser = new User({ username, password: encrypt });
    await newUser.save();
    response.status(201).json("User registered successfully");
});

exp.post("/login", async(request, response) =>{
    const {username, password} =request.body;
    const user= await User.findOne({username});
    if(!user){
        response.status(400).json({error: 'Invalid username'});
    }
    const pswd = await bcrypt.compare(password,user.password);
    if(!pswd){
        response.status(400).json({error: 'Invalid Credentials'});
    }
    const token = jwt.sign({user: user._id}, process.env.jwtPass, {expiresIn:'1h'});
    response.json({token, user : {id: user._id, username: user.username}});
});

