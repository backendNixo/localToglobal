
import express from "express";
import { connectDB } from "../../sharedDB/db.js";
import dotenv from "dotenv";
import planRoutes from "./routes/plan.route.js";
import {swaggerSpec} from "../src/config/swagger.js";
import swaggerUI from "swagger-ui-express";

import cors from "cors";
dotenv.config({
    path: './.env'
});

const app = express();
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));

connectDB(process.env.MONGO_URI);

app.use('/api/plan',planRoutes);

app.listen(7004, () => console.log("Server running on port 7004"));
