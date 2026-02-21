import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
    {
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        text: {
            type: String,
            required: true,
            maxlength: 280
        },
        likeCount: {
            type: Number,
            default: 0
        },

        commentCount: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);