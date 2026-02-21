import PostModel from "../models/post.schema.js";

export default class PostRepo {
    async createPost(data) {
        const post=new PostModel(data);
        return await post.save();
    }

    async updatePost(postId, userId, data) {
        return await PostModel.findOneAndUpdate(
            { _id: postId, authorId: userId },
            { $set: {text:data} },
            { new: true }
        );
    }

    async readPost(userId) {
        return await PostModel.find({ authorId: userId });
    }

    async deletePost(postId, userId) {
        return await PostModel.findOneAndDelete({ _id: postId, authorId: userId });
    }

    async findById(postId) {
        return await PostModel.findById(postId);
    }
}