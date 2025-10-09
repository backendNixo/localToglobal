import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    emailTo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Email = mongoose.model("Email", emailSchema);

export default Email;