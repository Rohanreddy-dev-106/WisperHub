import mongoose, { Schema } from "mongoose";

const AudienceSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },

        followers: {
            type: [Schema.Types.ObjectId],
            ref: "User",
            default: []
        },

        following: {
            type: [Schema.Types.ObjectId],
            ref: "User",
            default: []
        }
    },
    { timestamps: true }
);

export default mongoose.model("Audience", AudienceSchema);