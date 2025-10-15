import {
    CreatePlan,
    DeletePlan,
    ShowPlans,
    DeleteUser,
    BlockUser,
    UpdatePlan,
    SubscriptionList,
    GetPlanById
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

router.route('/delete-user/:id').delete(VerifyToken,isAdmin,DeleteUser);

router.route('/block-user/:id').patch(VerifyToken,isAdmin,BlockUser);

router.route('/update-plan/:id').patch(VerifyToken,isAdmin,UpdatePlan);

router.route('/get_subscription_list').get(VerifyToken,SubscriptionList);

router.route('/get_plan_byid/:id').get(VerifyToken,GetPlanById);

export default router;