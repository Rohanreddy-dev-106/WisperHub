import mongoose from "mongoose";
import CommentModel from "../models/comment.schema.js";
import PostModel from "../models/post.schema.js";

export default class Commentrepo {

    async createComment(Auther, postId, comment) {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const newComment = await CommentModel.create(
                [{ Auther, Postid: postId, Comment: comment }],
                { session }
            );

            const updatedPost = await PostModel.findByIdAndUpdate(
                postId,
                { $inc: { commentCount: 1 } },
                { new: true, session }
            );

            await session.commitTransaction();
            return { commentCount: updatedPost.commentCount };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async deleteComment(id, postId) {
        const deleted = await CommentModel.findByIdAndDelete(id);
        if (deleted) {
            await PostModel.findByIdAndUpdate(postId, { $inc: { commentCount: -1 } });
        }
        return deleted;
    }

    async readComment(postId) {
        return await CommentModel.find({ Postid: postId }).lean();
    }
}