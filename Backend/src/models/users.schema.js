import mongoose, { Schema } from "mongoose";
const UsersSchema = new Schema({
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
        ref: "Ban"
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

    AccessToken: {
        type: String,
        default: null
    }

}, { timestamps: true });

export default mongoose.model("User", UsersSchema);
