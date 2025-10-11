import EmailModel from "../models/email.model.js";
import APIError from "../utils/APIError.js";
import APIResponse from "../utils/APIResponse.js";

let QueueArray = [];

export const addEmail = async (req, res) => {
    try {
        const { emailTo, message } = req.body;
        if (!emailTo || !message) {
            return res.status(400).json(new APIError("All fields are required..", 400))
        }

        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!regex.test(emailTo)) {
            return res.status(400).json(new APIError("Invalid Email Format", 400));
        }
        QueueArray.push({ email: emailTo, message: message });
        console.log(QueueArray);
        
        return res.status(200).json(new APIResponse("Email added Successfully !", 200))
    } catch (error) {
        return res.status(500).json(new APIError("Error : ", error.message, 500))
    }
}

export const sendEmail = async (req, res) => {
    try {

        if (QueueArray.length == 0) {
            return res.status(400).json(new APIError("There Is No Any Email To Send", 400));
        }
        while(QueueArray.length!==0){
            const data = QueueArray.shift();
            console.log(data);
        }
        return res.status(200).json(new APIResponse("Email Send Successfully !", 200))
    } catch (error) {
        return res.status(500).json(new APIError("Error : ", error.message, 500))
    }
}