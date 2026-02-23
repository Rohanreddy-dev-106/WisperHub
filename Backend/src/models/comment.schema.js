import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    Auther: { type: Schema.Types.ObjectId, ref: "User" },
    Postid: { type: Schema.Types.ObjectId, ref: "Post" },
    Comment: { type: String, minlength: 5, maxlength: 50 }
}, { timestamps: true })

export default mongoose.model("Comment", CommentSchema);