import express from "express";
import cors from "cors";
import { swaggerSpec } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import emailRoutes from "./routes/email.route.js";
import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})
const app=express();

app.use(express.json());
app.use(express.urlencoded({}))
app.use(cors({
    origin:"",
    credentials:true
}))


const PORT=7002||process.env.PORT;
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/api/email',emailRoutes);

app.listen(PORT,()=>{
    console.log("Email MicroService Server Started At Port ",PORT);
})