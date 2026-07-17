import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validators/auth.validator";

import { authenticate } from "../middleware/auth.middleware";
import { rateLimit } from "../middleware/rate-limit.middleware";

const router = Router();
const controller = new AuthController();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation Error
 *       409:
 *         description: Email already exists
 */

router.post("/register", validate(registerSchema), controller.register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login Successful
 *       401:
 *         description: Invalid Credentials
 */
router.post("/login",rateLimit("login", 5, 300), validate(loginSchema), controller.login);

router.get("/profile", authenticate, controller.profile);

router.post("/refresh-token", controller.refreshToken);

router.post("/logout", controller.logout);

export default router;
