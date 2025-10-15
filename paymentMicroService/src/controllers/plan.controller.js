import BuyPlan from "../models/buyPlans.model.js";
import Plan from "../../../planMicroService/src/models/plan.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import axios from "axios"

export const paymentPlan = async (req, res) => {
  try {
    const id = req.params.id;

    
    if (!id) {
      return res.status(400).json(new APIError("Plan Id not found", 400));
    }
    const { data: plan } = await axios.get(
      `http://localhost:7004/api/plan/get_plan_byid/${id}`
    );
    // const plan = await plans.findOne({ _id: planId, isActive: true });
    if (!plan) {
      return res
        .status(404)
        .json(new APIError("Plan not found or inactive", 404));
    }
    
    
    const buyPlan = await BuyPlan.create({
      planId: plan.data._id,
      planName: plan.data.planName,
      amount: plan.data.amount,
      userId: req.user.id,
      paymentStatus: "pending",
      purchaseDate: new Date(),
    });

    return res
      .status(200)
      .json(new APIResponse("Payment initiated successfully !", 200, buyPlan));
  } catch (error) {
    console.log(error);
    
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};

export const paymentCallBack = async (req, res) => {
  try {
    const { planId, transactionId } = req.body;

    const buyPlan = await BuyPlan.findOne({
      planId: planId,
      userId: req.user.id,
    });

    if (!buyPlan) {
      return res.status(400).json(new APIError("Plan Not found", 400));
    }

    buyPlan.paymentStatus = "success";
    buyPlan.transactionId = transactionId || "njdnfyeuryjfjdhs";
    buyPlan.purchaseDate = new Date();
    buyPlan.isActive = true;

    await buyPlan.save();

    return res
      .status(200)
      .json(new APIResponse("Payment success", 200, buyPlan));
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};

export const GetTransactionHistory = async (req, res) => {
  try {
    const transactions = await BuyPlan.find({ userId: req.user.id });

    if (transactions.length == 0) {
      return res
        .status(400)
        .json(new APIError("transaction history not found", 400));
    }

    const history = transactions.map((tran) => ({
      planName: tran.planName,
      amount: tran.amount,
      transactionId: tran.transactionId,
      paymentStatus: tran.paymentStatus,
      purchaseDate: tran.purchaseDate,
      expireAt: tran.expireAt,
    }));

    return res
      .status(200)
      .json(
        new APIResponse(
          "Transaction History Fetched Successfully!",
          200,
          history
        )
      );
  } catch (error) {
    return res.status(500).json(new APIError("Error: " + error.message, 500));
  }
};
