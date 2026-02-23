import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";
import LikesController from "../controllers/like.controller.js";

const LikeRoutes = express.Router();
const Like = new LikesController();

// toggle like / dislike
LikeRoutes.post("/create-like/:postId", jwtAuth, (req, res, next) => {
    Like.CreateLike(req, res, next);
});
export default LikeRoutes;