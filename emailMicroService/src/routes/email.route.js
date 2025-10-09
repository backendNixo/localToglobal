import {addEmail,sendEmail} from "../controller/email.controller.js";
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
router.route('/add-email').post(addEmail);

/**
 * @swagger
 * /send-email:
 *   get:
 *     summary: Send Email
 *     tags: [Email Apis]
 *     responses:
 *       200:
 *         description: Email Send Successfully!
 */
router.route('/send-email').get(sendEmail);

export default router;
