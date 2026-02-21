import mongoose, { Schema } from "mongoose";

const BanSchema = new Schema(
    {
        ip: [{
            type: String,
            trim: true,
            default: null,
            index: true
        }],

        anonymousId: {
            type: String,
            trim: true,
            default: null,
            index: true
        },

        reason: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 255,
            required: true
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true
        }
    },
    {
        timestamps: true,
    }
);


export default mongoose.model("Ban", BanSchema);
