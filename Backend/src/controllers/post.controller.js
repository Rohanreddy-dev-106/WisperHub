import PostRepo from "../repo/post.repo.js";

export default class PostController {
    _postRepo;

    constructor() {
        this._postRepo = new PostRepo();
    }

    async createPost(req, res) {
        try {
            const { text } = req.body;
            const authorId = req.user.UserID;

            if (!text) {
                return res.status(400).json({ success: false, message: "Text is required" });
            }

            const post = await this._postRepo.createPost({ authorId, text });
            return res.status(201).json({ success: true, post });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async updatePost(req, res) {
        try {
            const { postId } = req.params;
            const { text } = req.body;
            const userId = req.user.UserID;

            if (!text) {
                return res.status(400).json({ success: false, message: "Text is required" });
            }

            // findOneAndUpdate scopes by both postId + authorId → one atomic round-trip
            const updatedPost = await this._postRepo.updatePost(postId, userId, text);

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
            const posts = await this._postRepo.readPost(userId);
            return res.status(200).json({ success: true, posts });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async readAllPosts(req, res) {
        try {
            const posts = await this._postRepo.readAllPosts();
            return res.status(200).json({ success: true, posts });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async readOnePost(req, res) {
        try {
            const { postId } = req.params;
            const post = await this._postRepo.findById(postId);
            if (!post) {
                return res.status(404).json({ success: false, message: "Post not found" });
            }
            return res.status(200).json({ success: true, post });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            const { postId } = req.params;
            const userId = req.user.UserID;

            // findOneAndDelete scopes by postId + authorId — no extra ownership check needed
            const deleted = await this._postRepo.deletePost(postId, userId);

            if (!deleted) {
                return res.status(404).json({ success: false, message: "Post not found or unauthorized" });
            }

            return res.status(200).json({ success: true, message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}