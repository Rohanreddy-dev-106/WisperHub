import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema({
    UserName: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true,
        unique: true,
        trim: true
    },

    Uniqueid: {
        type: String,
        required: true,
        unique: true
    },

    Ip: {
        type: String,
        default: null
    },

    IpHistory: [{
        type: String
    }],

    UserDevice: {
        type: String,
        default: null
    },

    isBanned: {
        type: Boolean,
        default: false
    },

    Avatar: {
        type: String,
        default: null
    },

    Baninfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Ban"
    },

    Role: {
        type: String,
        required: true,
        enum: ["user", "admin", "manager"],
        default: "user"
    },

    RefreshToken: {
        type: String,
        default: null
    },

    AccessToken: {
        type: String,
        default: null
    }

}, { timestamps: true });

export default mongoose.model("User", UsersSchema);
