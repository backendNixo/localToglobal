import { Register,Login } from "../controllers/auth.controller.js";
import e from "express";

const router=e.Router();
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register
 *     tags: [User Auth Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Registered Successfully!
 */
router.route('/register').post(Register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login User
 *     tags: [User Auth Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Logined Successfully!
 */
router.route('/login').post(Login);

export default router;