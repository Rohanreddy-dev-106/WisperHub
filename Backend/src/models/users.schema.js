import mongoose, { Schema } from "mongoose";
const UsersSchema = new Schema({
    Username: {
        type: String,
        default: null
    },
    Uniqueid: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 8,
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
        ref: "Ban",
        default: null
    },
    Bio: {
        type: String,
        minlength: 20,
        maxlength: 60,
        required: true
    },

    Age: {
        type: Number,
        min: 18,
        max: 60,
        required: true
    },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 }


}, { timestamps: true });

export default mongoose.model("User", UsersSchema);
