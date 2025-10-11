import APIError from "../utils/APIError.js"
export const isAdmin=async(req,res,next)=>{
    try {
        const role=req.user.role;
        if(role!=="admin"){
             return res.status(400).json(new APIError("Unauthorized User",400));
        }
        next();
    } catch (error) {
        return res.status(500).json(new APIError("Error : "+error.message,500));
    }
}