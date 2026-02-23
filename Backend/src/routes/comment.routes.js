import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";
import Commentcontroller from "../controllers/comment.controller.js";

const CommentRoutes = express.Router();
const Comment = new Commentcontroller();

// create comment
CommentRoutes.post("/create-comment", jwtAuth, (req, res) => {
  Comment.Comment(req, res);
});

// read comments by postId
CommentRoutes.get("/read-comment/:postId", (req, res) => {
  Comment.Readcomment(req, res);
});

// delete comment by commentId
CommentRoutes.delete("/delete-comment/:id", jwtAuth, (req, res) => {
  Comment.Deletecomment(req, res);
});

export default CommentRoutes;