import CommentModel from "../models/comment.schema.js";
import PostModel from "../models/post.schema.js"
export default class Commentrepo {

  async createComment(Auther, postId, comment) {
    const newComment = new CommentModel({
      Auther: Auther,
      Postid: postId,
      Comment: comment
    });
    const addcount = await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: 1 } }
      , { new: true });
    await newComment.save();
    return {
      commentCount: addcount.commentCount
    };
  }

  async deleteComment(id, Postid) {
    const deletecomment = await CommentModel.findByIdAndDelete(id);
    await PostModel.findByIdAndUpdate(
      Postid,
      { $inc: { commentCount: -1 } }
    );
    return deletecomment;
  }


  async readComment(postId) {
    return await CommentModel.find({ Postid: postId });
  }
}