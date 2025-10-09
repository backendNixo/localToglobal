import jwt from "jsonwebtoken";

export const GenerateToken=async(id,email)=>{
   return jwt.sign(
    {id,email},
    JWT_SECRET_KEY,
    {
        expiresIn:'2h'
    }
)
}