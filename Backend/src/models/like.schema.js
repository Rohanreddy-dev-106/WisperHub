import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema({
    Auther: { type: Schema.Types.ObjectId, ref: "User" },
    Postid: { type: Schema.Types.ObjectId, ref: "Post" }
},
    { timestamps: true }
)
LikeSchema.index({ Auther: 1, Postid: 1 }, { unique: true });
export default mongoose.model("Like", LikeSchema);