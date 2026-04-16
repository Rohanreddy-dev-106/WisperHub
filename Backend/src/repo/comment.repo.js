import mongoose from "mongoose";
import CommentModel from "../models/comment.schema.js";
import PostModel from "../models/post.schema.js";

export default class Commentrepo {

    async createComment(Auther, postId, comment) {
        const newComment = await CommentModel.create({ Auther, Postid: postId, Comment: comment });
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { commentCount: 1 } },
            { new: true }
        );
        return { commentCount: updatedPost.commentCount };
    }

    async deleteComment(id, postId) {
        const deleted = await CommentModel.findByIdAndDelete(id);
        if (deleted) {
            await PostModel.findByIdAndUpdate(postId, { $inc: { commentCount: -1 } });
        }
        return deleted;
    }

    async readComment(postId) {
        return await CommentModel.find({ Postid: postId }).populate("Auther", "Uniqueid Avatar").lean();
    }
}