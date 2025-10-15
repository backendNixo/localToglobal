import {
  createSupport,
  ResolveSupport,
  DeleteSupport,
} from "../controllers/support.controller.js";
import express from "express";
import { VerifyToken } from "../middlewares/VerifyToken.js";
const router = express.Router();

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
router.route("/create_support").post(VerifyToken, createSupport);
router.route("/delete_support").delete(VerifyToken, DeleteSupport);
router.route("/resolve_support/:id").post(VerifyToken, ResolveSupport);
export default router;
