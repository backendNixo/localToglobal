import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  used: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true 
  },
  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  paymentStatus: {
    type: String,
    enum: ["success", "pending", "failed"],
    default: "pending"
  }
}, { timestamps: true });

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
