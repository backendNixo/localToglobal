import {
paymentPlan,
paymentCallBack,
GetTransactionHistory
} from "../controllers/plan.controller.js";
import {VerifyToken} from "../middlewares/verifyToken.js";
import express from "express";
const router=express.Router();

/**
 * @swagger
 * /payment-plan/:id:
 *   post:
 *     summary: Payment Plan Initialized
 *     tags: [Payment Apis]
 *     responses:
 *       200:
 *         description: Plan Initialized Successfully!
 */
router.route('/payment-plan/:id').post(VerifyToken,paymentPlan);

/**
 * @swagger
 * /payment_callback_plan:
 *   post:
 *     summary: Payment Callback
 *     tags: [Payment Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *               transactionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plan Payment Successfully!
 */
router.route('/payment_callback_plan').post(VerifyToken,paymentCallBack);

/**
 * @swagger
 * /get_transaction_history:
 *   get:
 *     summary: Transaction History
 *     tags: [Payment Apis]
 *     responses:
 *       200:
 *         description: Get Transaction History Successfully!
 */
router.route('/get_transaction_history').get(VerifyToken,GetTransactionHistory);


export default router;