import CommentModel from "../models/comment.schema.js";

export default class Commentrepo {

  async createComment(Auther, postId, comment) {
    const newComment = new CommentModel({
      Auther: Auther,
      Postid: postId,
      Comment: comment
    });

    return await newComment.save();
  }

  async deleteComment(id) {
    return await CommentModel.findByIdAndDelete(id);
  }

  async readComment(postId) {
    return await CommentModel.find({ Postid: postId });
  }
}