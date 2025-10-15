
import express from "express";
// import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import supportRoutes from "./routes/support.route.js";
import dotenv from "dotenv";
import {swaggerSpec} from "../src/config/swagger.js";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";
import {connectDB} from "../../sharedDB/db.js"
import cors from "cors";
dotenv.config({
    path: './.env'
});

const app = express();
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));

connectDB(process.env.MONGO_URI);

app.use('/api',authRoutes);
app.use('/api',supportRoutes);

app.listen(7001, () => console.log("Server running on port 7001"));
