import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";
import AudienceController from "../controllers/follow.following.controller.js";

const AudienceRoutes = express.Router();
const Audience = new AudienceController();

/**
 * Follow a user
 */
AudienceRoutes.post("/follow/:targetUserId", jwtAuth, (req, res, next) => {
    Audience.Follow(req, res, next);
});

/**
 * Unfollow a user
 */
AudienceRoutes.delete("/unfollow/:targetUserId", jwtAuth, (req, res, next) => {
    Audience.Unfollow(req, res, next);
});

export default AudienceRoutes;