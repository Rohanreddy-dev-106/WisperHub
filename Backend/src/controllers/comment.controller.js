import Commentrepo from "../repo/comment.repo.js";

export default class Commentcontroller {
    _CommentRepository;

    constructor() {
        this._CommentRepository = new Commentrepo();
    }

    async Comment(req, res) {
        try {
            const { postId, comment } = req.body;
            console.log(postId);
            
            const Auther = req.user.UserID;

            if (!postId || !comment) {
                return res.status(400).json({
                    success: false,
                    message: "postId and comment are required"
                });
            }

            const data = await this._CommentRepository.createComment(
                Auther,
                postId,
                comment
            );

            res.status(201).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create comment",
                error: error.message
            });
        }
    }

    async Deletecomment(req, res) {
        try {
            const { id } = req.params;
            const {postId}=req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Comment id is required"
                });
            }

            await this._CommentRepository.deleteComment(id,postId);

            res.status(200).json({
                success: true,
                message: "Comment deleted"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete comment",
                error: error.message
            });
        }
    }

    async Readcomment(req, res) {
        try {
            const { postId } = req.params;

            if (!postId) {
                return res.status(400).json({
                    success: false,
                    message: "postId is required"
                });
            }

            const comments = await this._CommentRepository.readComment(postId);

            res.status(200).json({
                success: true,
                data: comments
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to read comments",
                error: error.message
            });
        }
    }
}