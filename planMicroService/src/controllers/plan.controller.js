import PlanModel from "../models/plan.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";


export const CreatePlan = async (req, res) => {
  try {
    const { planName, amount } = req.body;

    if (!planName || !amount) {
      return res.status(400).json(new APIError("All fields are required", 400));
    }
  
    if (amount <= 0) {
      return res.status(400).json(new APIError("Amount should be greater than 0", 400));
    }

    await PlanModel.create({
      planName,
      amount,
      createdBy: req.user.id
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
      createdBy: req.user.id
    });

    if (!deletedPlan) {
      return res.status(404).json(new APIError("Plan not found or unauthorized", 404));
    }

    return res.status(200).json(new APIResponse("Plan deleted successfully!", 200));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};

export const ShowPlans = async (req, res) => {
  try {
    const plans = await PlanModel.find();
    if (plans.length==0) {
      return res.status(404).json(new APIError("No plans found", 404));
    }

    return res
      .status(200)
      .json(new APIResponse("Plans fetched successfully!", 200, plans));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};


