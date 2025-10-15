import SupportModel from "../models/support.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";

export const createSupport = async (req, res) => {
    try {
        const { fullname, email, mobileNumber, subject, message } = req.body;

        if (!fullname || !email || !subject || !mobileNumber || !message) {
            return res.status(400).json(new APIError("All Fields Are Required", 400));
        }
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!regex.test(email)) {
            return res.status(400).json(new APIError("Invalid Email Format", 400));
        }
        regex = /^[6-9]\d{9}$/
        if (!regex.test(mobileNumber)) {
            return res.status(400).json(new APIError("Invalid Mobile Number Format", 400));
        }
        const isExist = await SupportModel.findOne({ email: email });
        if (isExist) {
            return res.status(400).json(new APIError("Email Already Exist", 400));
        }

        const support=await SupportModel.create({
            fullname,
            email,
            mobileNumber,
            subject,
            message,
            isResolved:false,
            remark:"",
            userId: req.user.id
        })
       await support.save();
        return res.status(200).json(new APIResponse("Message Saved Successfully !", 200))
    } catch (error) {
        console.log(error);

        return res.status(500).json(new APIError("Error : " + error.message, 500));
    }
}

export const DeleteSupport = async (req, res) => {
    try {
        const msgId = req.params.id;
        if (!msgId) {
            return res.status(400).json(new APIError("Message Id Not Found", 400));
        }
        const isDeleted = await SupportModel.findOneAndDelete({ _id: msgId, userId: req.user.id })
        if(!isDeleted){
            return res.status(400).json(new APIError("Deleting Message Failed", 400));
        }
        return res.status(200).json(new APIResponse("Message Removed Successfully !", 200))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error : " + error.message, 500));
    }
}

export const ResolveSupport=async(req,res)=>{
    try {
        const supportId=req.params.id;
        if(!supportId){
             return res.status(400).json(new APIError("Support Id Not Found", 400));
        }
        const {remark}=req.body;
        if(!remark){
             return res.status(400).json(new APIError("Remark Not Found", 400));
        }
        const support=await SupportModel.findOne({_id:supportId});
        if(!support){
            return res.status(400).json(new APIError("Support Not Found", 400));
        }

        support.remark=remark;
        support.isResolved=true;
        await support.save();
          return res.status(200).json(new APIResponse("Support Resolved Successfully !", 200))
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error.message, 500));
    }
}



