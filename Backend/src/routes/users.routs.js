import express from "express";
import UserController from "../controllers/users.controller.js"
import jwtAuth from "../middlewares/jwtAuth.js"
const UserRoutes= express.Router();


const User=new UserController();

UserRoutes.post("/register",jwtAuth,(req,res,next)=>{
    User.Register(req,res,next);
})

UserRoutes.post("/login",jwtAuth,(req,res,next)=>{
    User.Login(req,res,next);
})

UserRoutes.delete("/logout",jwtAuth,(req,res,next)=>{
    User.Logout(req,res,next);
})





export default UserRoutes;