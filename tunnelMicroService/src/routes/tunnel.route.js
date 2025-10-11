import {
    SearchSubdomain,
    CreateTunnel,
    GetTunnelList
} from "../controllers/subdomain.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js"
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /search_subdomain:
 *   post:
 *     summary: Search Subdomain
 *     tags: [Tunnel Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               subdomain:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subdomain Find Successfully!
 */
router.route('/search_subdomain').post(VerifyToken,SearchSubdomain);

/**
 * @swagger
 * /create_tunnel:
 *   post:
 *     summary: Create Tunnel 
 *     tags: [Tunnel Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *               subdomain:
 *                 type: string
 *               localhost:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tunnel Created Successfully!
 */
router.route('/create_tunnel').post(VerifyToken,CreateTunnel);
/**
 * @swagger
 * /get_tunnel_list:
 *   get:
 *     summary: Create Tunnel 
 *     tags: [Tunnel Apis]
 *     responses:
 *       200:
 *         description: Get Tunnel List Successfully!
 */
router.route('/get_tunnel_list').get(VerifyToken,GetTunnelList);

export default router;
