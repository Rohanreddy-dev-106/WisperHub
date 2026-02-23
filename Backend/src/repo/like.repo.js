import LikeModel from "../models/like.schema.js";
import PostModel from "../models/post.schema.js";

export default class LikeRepo {
    async createlikes(authorId, postId) {
        try {
            const isexist = await LikeModel.findOne({
                Auther: authorId,
                Postid: postId
            });

            if (!isexist) {
                // like
                const like = new LikeModel({
                    Auther: authorId,
                    Postid: postId
                });
                await like.save();

                await PostModel.findByIdAndUpdate(
                    postId,
                    { $inc: { likeCount: 1 } }
                );

                return {
                    action: "liked",
                    like: true
                };
            } else {
                // dislike
                await LikeModel.deleteOne({
                    Auther: authorId,
                    Postid: postId
                });

                await PostModel.findByIdAndUpdate(
                    postId,
                    { $inc: { likeCount: -1 } }
                );

                return {
                    action: "disliked",
                    like: false
                };
            }
        } catch (error) {
            throw error;
        }
    }
}