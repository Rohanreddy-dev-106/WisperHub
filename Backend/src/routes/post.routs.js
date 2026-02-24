import express from "express";
import PostController from "../controllers/post.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import multerUplode from "../middlewares/multer.js"
const PostRoutes = express.Router();

const Post = new PostController();

PostRoutes.post("/create", jwtAuth, multerUplode.single("media"), (req, res, next) => {
    Post.createPost(req, res, next);
});

PostRoutes.put("/update/:postId", jwtAuth, multerUplode.single("media"), (req, res, next) => {
    Post.updatePost(req, res, next);
});

PostRoutes.get("/get/:userId", jwtAuth, (req, res, next) => {
    Post.readPost(req, res, next);
});

PostRoutes.delete("/delete/:postId", jwtAuth, (req, res, next) => {
    Post.deletePost(req, res, next);
});

export default PostRoutes;