import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";


export const VerifyToken=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        if(!authHeader||!authHeader.startsWith("Bearer")){
        return res.status(401).json(new APIError("Authorization token missing or malformed",401 ));
        }

        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
    return res.status(401).json(new APIError("Invalid or expired token",401));
    }
}



