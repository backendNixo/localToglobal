import UserModel from "../models/user.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";
import { GenerateToken } from "../utils/GenerateToken.js";
import bcrypt from 'bcryptjs'
export const Register = async (req, res) => {
    try {
        const { name, email, password, mobileNumber } = req.body;
         console.log(req.body);
         
        if (!name || !email || !password || !mobileNumber) {
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
        const isExist = await UserModel.findOne({ email: email });
        if (isExist) {
            return res.status(400).json(new APIError("User Already Exist", 400));
        }
        const hashedpassword =await bcrypt.hash(password, 10);

        await UserModel.create({
            name,
            email,
            password: hashedpassword,
            mobileNumber
        })

        return res.status(200).json(new APIResponse("User Registered Successfully !", 200))
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(new APIError("Error : " + error.message, 500));
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new APIError("All Fields Are Required", 400));
        }
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!regex.test(email)) {
            return res.status(400).json(new APIError("Invalid Email Format", 400));
        }

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json(new APIError("User Not Exist", 404));
        }

        const match = bcrypt.compare(password,user.password );
         if (!match) {
            return res.status(400).json(new APIError("User Credetial Not Match", 400));
        }
        
        const token=await GenerateToken(user._id,email);

        return res.status(200).json(new APIResponse("User Logined Successfully !", 200,token))
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error.message, 500));
    }
}