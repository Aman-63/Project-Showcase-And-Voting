import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../data/user.js";
import dotenv from "dotenv";


dotenv.config();

const exp= express.Router();

exp.post("/signup", async(request, response) =>{
    const {username, scholarId, email, password, confirmPassword} =request.body;
    const exstngUser = await User.findOne({username});
    if(exstngUser){
        return response.status(400).json({error: "Username already exists"});
    }
    if(password!== confirmPassword){
        return response.status(400).json({error: "Passwords do not match..."});
    }
    const encrypt= await bcrypt.hash(password,10);
    const newUser = new User({ username, password: encrypt });
    await newUser.save();
    response.status(201).json({message: "User registered successfully..."});
});

exp.post("/login", async(request, response) =>{
    const {username, password} =request.body;
    const user= await User.findOne({username});
    if(!user){
        return response.status(400).json({error: 'Invalid username'});
    }
    const pswd = await bcrypt.compare(password,user.password);
    if(!pswd){
        return response.status(400).json({error: 'Invalid Credentials'});
    }
    const token = jwt.sign({id: user._id, user:user.username}, process.env.JWT_PASS, {expiresIn:'1h'});
    response.json({token, user : {id: user._id, username: user.username}});
});

export default exp;
