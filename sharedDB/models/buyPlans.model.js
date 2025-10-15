import mongoose from "mongoose";

 const BuyPlanSchema = new mongoose.Schema({
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  planName: {
    type:String,
  },
  amount: {
    type:Number
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
  },
  purchaseDate: {
    type:Date
  },
  paymentStatus: {
    type: String,
    enum: ["success", "pending", "failed"],
    default: "pending"
  },
  transactionId: {
    type:String
  }
}, { timestamps: true });

const BuyPlan=mongoose.model("BuyPlan",BuyPlanSchema);
export default BuyPlan;