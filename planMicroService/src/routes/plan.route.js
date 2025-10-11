import {
    CreatePlan,
    DeletePlan,
    ShowPlans
} from "../controllers/plan.controller.js";
import express from "express";
import {VerifyToken} from "../middlewares/verifyToken.js";
import {isAdmin} from "../middlewares/isAdmin.js";
const router=express.Router();

/**
 * @swagger
 * /create_plan:
 *   post:
 *     summary: Create Plan
 *     tags: [Plan Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               planName:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Plan Created Successfully!
 */
router.route('/create_plan').post(VerifyToken,isAdmin,CreatePlan);

/**
 * @swagger
 * /delete_plan/:id:
 *   delete:
 *     summary: Delete Plan
 *     tags: [Plan Apis]
 *     responses:
 *       200:
 *         description: Plan Deleted Successfully!
 */
router.route('/delete_plan/:id').post(VerifyToken,isAdmin,DeletePlan);

/**
 * @swagger
 * /show_plans:
 *   get:
 *     summary: Get Plans
 *     tags: [Plan Apis]
 *     responses:
 *       200:
 *         description: Get Plan Successfully!
 */
router.route('/show_plans').get(VerifyToken,ShowPlans);

export default router;