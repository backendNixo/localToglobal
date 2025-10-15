
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})
export const VerifyToken=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        if(!authHeader||!authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"Authorization token missing or malformed"});
        }

        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
    return res.status(401).json({message:"Invalid or expired token"});
    }
}