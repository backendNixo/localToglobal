import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    used: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expireAt: {
      type: Date
    },
    paymentStatus: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
    apiCalls: {
      type: Number,
      required: true,
      default:4999
    },
    avilableTunnel: {
      type: Number,
      required: true,
      default:1
    },
    activeTunnel: {
      type: Number,
      required: true,
      default:1
    },
    connections: {
      type: Number,
      required: true,
      default:10
    },
    forDay: {
      type: Number,
      required: true,
      default:84
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
