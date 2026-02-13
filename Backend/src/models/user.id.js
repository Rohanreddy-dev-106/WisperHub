import mongoose, { Schema } from "mongoose";
const Useridschema = new Schema({
    firstNames: {
        type: [String],
        required: true,
        index: true,
    },
    lastNames: {
        type: [String],
        required: true,
        index: true,
    },
});

export default mongoose.model("username", Useridschema);
