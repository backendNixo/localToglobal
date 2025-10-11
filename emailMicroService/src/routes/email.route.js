import {addEmail,sendEmail} from "../controller/email.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js";
import express from "express";

const router=express.Router();


/**
 * @swagger
 * /add-email:
 *   post:
 *     summary: Add Email
 *     tags: [Email Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               emailTo:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email Added Successfully!
 */
router.route('/add-email').post(VerifyToken,addEmail);

/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Send Email
 *     tags: [Email Apis]
 *     responses:
 *       200:
 *         description: Email Send Successfully!
 */
router.route('/send-email').post(VerifyToken,sendEmail);

export default router;
