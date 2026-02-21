import PostRepo from "../repo/post.repo.js";

const postRepo = new PostRepo();

export default class PostController {

    async createPost(req, res) {
        try {
            const { text } = req.body;
            const authorId = req.user.UserID

            if (!text) {
                return res.status(400).json({ success: false, message: "Text is required" });
            }

            const post = await postRepo.createPost({ authorId, text });

            return res.status(201).json({ success: true, post });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async updatePost(req, res) {
        try {
            const { postId } = req.params;
            const { text } = req.body;
            const userId = req.user._id;

            const updatedPost = await postRepo.updatePost(postId, userId, text);

            if (!updatedPost) {
                return res.status(404).json({ success: false, message: "Post not found or unauthorized" });
            }

            return res.status(200).json({ success: true, post: updatedPost });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async readPost(req, res) {
        try {
            const userId = req.params.userId || req.user.UserID;

            const posts = await postRepo.readPost(userId);

            return res.status(200).json({ success: true, posts });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            const { postId } = req.params;
            const userId = req.user.UserID

            const deleted = await postRepo.deletePost(postId, userId);

            if (!deleted) {
                return res.status(404).json({ success: false, message: "Post not found or unauthorized" });
            }

            return res.status(200).json({ success: true, message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}