import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";
import FollowController from "../controllers/follow.following.controller.js";

const FollowRoutes = express.Router();

//Follow/unFollow controller
const Follow = new FollowController();

// Follow a user
FollowRoutes.post("/follow/:targetid", jwtAuth, (req, res, next) => {
    Follow.Follow(req, res, next);
});

// Unfollow a user
FollowRoutes.delete("/unfollow/:targetid", jwtAuth, (req, res, next) => {
    Follow.Unfollow(req, res, next);
});

// Get follow status
FollowRoutes.get("/status/:targetid", jwtAuth, (req, res, next) => {
    Follow.Status(req, res, next);
});

export default FollowRoutes;