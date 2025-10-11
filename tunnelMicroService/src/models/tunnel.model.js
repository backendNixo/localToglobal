import mongoose from "mongoose";

const TunnelSchema = new mongoose.Schema({
    subdomain: {
        type: String,
        required: true,
        trim: true
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    localhost: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Tunnel = mongoose.model("Tunnel", TunnelSchema);

export default Tunnel;