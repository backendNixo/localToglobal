import {createSupport} from "../controllers/support.controller.js";
import express from "express";
import {VerifyToken} from "../routes/auth.routes.js"
const router=express.Router();


/**
 * @swagger
 * /get_support:
 *   post:
 *     summary: Get Support
 *     tags: [User Auth Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message Saved Successfully!
 */
router.route('/get_support').post(VerifyToken,createSupport);

export default router;