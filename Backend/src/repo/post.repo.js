import PostModel from "../models/post.schema.js";

export default class PostRepo {
    async createPost(data) {
        const post = new PostModel(data);
        return await post.save();
    }

    async updatePost(postId, userId, data) {
        return await PostModel.findOneAndUpdate(
            { _id: postId, authorId: userId },
            { $set: { text: data } },
            { new: true }
        );
    }

    async readPost(userId) {
        return await PostModel.find({ authorId: userId })
            .populate("authorId", "Uniqueid Username Avatar")
            .lean()
            .sort({ createdAt: -1 });
    }

    async readAllPosts() {
        return await PostModel.find({})
            .populate("authorId", "Uniqueid Username Avatar")
            .lean()
            .sort({ createdAt: -1 });
    }

    async deletePost(postId, userId) {
        return await PostModel.findOneAndDelete({ _id: postId, authorId: userId });
    }

    async findById(postId) {
        return await PostModel.findById(postId).populate("authorId", "Uniqueid Username Avatar").lean();
    }
}