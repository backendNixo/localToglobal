import PlanModel from "../models/plan.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import User from "../../../userMicroService/src/models/user.model.js";
// import BuyPlan from "../models/buyPlans.model.js";

export const CreatePlan = async (req, res) => {
  try {
    const { planName, amount } = req.body;

    if (!planName || !amount) {
      return res.status(400).json(new APIError("All fields are required", 400));
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json(new APIError("Amount should be greater than 0", 400));
    }

    await PlanModel.create({
      planName,
      amount,
      createdBy: req.user.id,
    });

    return res
      .status(200)
      .json(new APIResponse("Plan created successfully!", 200));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};
export const DeletePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    if (!planId) {
      return res.status(400).json(new APIError("Plan ID is required", 400));
    }

    const deletedPlan = await PlanModel.findOneAndDelete({
      _id: planId,
      createdBy: req.user.id,
    });

    if (!deletedPlan) {
      return res
        .status(404)
        .json(new APIError("Plan not found or unauthorized", 404));
    }

    return res
      .status(200)
      .json(new APIResponse("Plan deleted successfully!", 200));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};
export const UpdatePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    if (!planId) {
      return res.status(400).json(new APIError("Plan ID is required", 400));
    }

    const Plan = await PlanModel.findOne({
      _id: planId,
      createdBy: req.user.id,
    });

    if (!Plan) {
      return res
        .status(404)
        .json(new APIError("Plan not found or unauthorized", 404));
    }
   Plan.planName=req.body.planName??Plan.planName;
   Plan.amount=req.body.amount??Plan.amount;
   Plan.isActive=req.body.isActive??Plan.isActive;
   await Plan.save();
    return res
      .status(200)
      .json(new APIResponse("Plan updated successfully!", 200));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};
export const ShowPlans = async (req, res) => {
  try {
    const plans = await PlanModel.find();
    if (plans.length == 0) {
      return res.status(404).json(new APIError("No plans found", 404));
    }

    return res
      .status(200)
      .json(new APIResponse("Plans fetched successfully!", 200, plans));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};
export const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const isUserDeleted = await User.findOneAndDelete({ _id: userId });
    if (!isUserDeleted) {
      return res
        .status(404)
        .json(new APIError("Error occure when deleting user", 404));
    }

    return res
      .status(200)
      .json(new APIResponse("User deleted successfully!", 200));
  } catch (error) {
    return res.status(500).json(new APIError("Error : " + error.message, 500));
  }
};
export const BlockUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json(new APIError("User not found", 404));
    }
    user.isBlocked = req.body.isBlocked??user.isBlocked;
    await user.save();
    return res
      .status(200)
      .json(new APIResponse("User blocked successfully!", 200));
  } catch (error) {
    return res.status(500).json(new APIError("Error : " + error.message, 500));
  }
};
export const SubscriptionList=async (req, res) => {
  try {
    const plans = await BuyPlan.find();
    if (plans.length == 0) {
      return res.status(400).json(new APIError("No Subscription found", 400));
    }

    return res
      .status(200)
      .json(new APIResponse("Subscription List : ", 200, plans));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};
export const GetPlanById = async (req, res) => {
  try {
    const id=req.params.id;
      console.log("plan side ",id);
    const plans = await PlanModel.findOne({_id:id});
    if (!plans) {
      return res.status(404).json(new APIError("No plans found", 404));
    }

    return res
      .status(200)
      .json(new APIResponse("Plans fetched successfully!", 200, plans));
  } catch (error) {
    console.log(error);
    
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};
