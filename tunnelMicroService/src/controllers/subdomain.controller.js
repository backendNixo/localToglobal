import BuyPlan from "../../../planMicroService/src/models/buyPlans.model.js";
import TunnelModel from "../models/tunnel.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";

export const SearchSubdomain = async (req, res) => {
  try {
    const { subdomain } = req.body;

    if (!subdomain) {
      return res.status(400).json(new APIError("Subdomain is required", 400));
    }

    const isSubdomainExist = await TunnelModel.findOne({ subdomain });

    if (isSubdomainExist) {
      return res
        .status(400)
        .json(new APIError("Subdomain already available", 400));
    }

    const planNameList = await BuyPlan.find(
      { userId: req.user.id, used: false, paymentStatus: "success" },
      { planName: 1 }
    );

    return res
      .status(200)
      .json(new APIResponse("Subdomain available", 200, planNameList));
  } catch (error) {
    return res
      .status(500)
      .json(new APIError("Error: " + error.message, 500));
  }
};

export const CreateTunnel = async (req, res) => {
  try {
    const { planId, subdomain, localhost } = req.body;

    if (!planId || !subdomain || !localhost) {
      return res
        .status(400)
        .json(new APIError("All fields are required", 400));
    }

    const isPlan = await BuyPlan.findOne({
      _id: planId,
      userId: req.user.id,
      paymentStatus: "success"
    });

    if (!isPlan) {
      return res
        .status(404)
        .json(new APIError("Plan not found", 404));
    }

    const isSubdomainExist = await TunnelModel.findOne({ subdomain });
    if (isSubdomainExist) {
      return res
        .status(400)
        .json(new APIError("Subdomain already available", 400));
    }

    if (isPlan.used === true) {
      return res
        .status(400)
        .json(new APIError("this plan already in used", 400));
    }
    isPlan.used = true;
    await isPlan.save();
    await TunnelModel.create({
      planId,
      subdomain,
      localhost,
      userId: req.user.id
    });

    return res
      .status(200)
      .json(new APIResponse("Tunnel created successfully!", 200));
  } catch (error) {
    return res
      .status(500)
      .json(new APIError("Error: " + error.message, 500));
  }
};

export const GetTunnelList = async (req, res) => {
  try {
    const tunnelList = await TunnelModel.find({ userId: req.user.id });

    if (tunnelList.length == 0) {
      return res
        .status(404)
        .json(new APIError("No tunnels found", 404));
    }
    return res
      .status(200)
      .json(new APIResponse("Tunnel list fetched successfully!", 200, tunnelList));
  } catch (error) {
    return res
      .status(500)
      .json(new APIError("Error: " + error.message, 500));
  }
};
