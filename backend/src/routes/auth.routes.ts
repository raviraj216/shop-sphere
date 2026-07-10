import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import {registerSchema, loginSchema} from "../validators/auth.validator";

import { authenticate } from "../middleware/auth.middleware";
 
const router = Router();
const controller = new AuthController();

router.post(
    "/register",
    validate(registerSchema),
    controller.register
);

router.post(
    "/login",
    validate(loginSchema),
    controller.login
);

router.get(
    "/profile",
    authenticate,
    controller.profile
);


router.post(
    "/refresh-token",
    controller.refreshToken
);

router.post(
    "/logout",
    controller.logout
);

export default router;