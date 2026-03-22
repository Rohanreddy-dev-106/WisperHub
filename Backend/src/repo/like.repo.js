import LikeModel from "../models/like.schema.js";
import PostModel from "../models/post.schema.js";

export default class LikeRepo {
    async createlikes(authorId, postId) {
        const existing = await LikeModel.findOne({ Auther: authorId, Postid: postId });

        if (!existing) {
            await LikeModel.create({ Auther: authorId, Postid: postId });
            await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
            return { action: "liked", like: true };
        }

        await LikeModel.deleteOne({ Auther: authorId, Postid: postId });
        await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
        return { action: "disliked", like: false };
    }
}