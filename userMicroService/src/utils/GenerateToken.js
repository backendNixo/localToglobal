import jwt from "jsonwebtoken";

export const GenerateToken=async(id,email)=>{
   return jwt.sign(
    {id,email},
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:'2h'
    }
)
}