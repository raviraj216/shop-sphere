import { Router } from "express";
import { UserController } from "../controllers/user.controller";

import { validate } from "../middleware/validate";

import { createUserSchema ,updateUserSchema} from "../validators/user.validator";
import {authorize} from "../middleware/authorize";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const controller = new UserController();

router.post("/",authenticate,authorize("admin"), validate(createUserSchema), controller.create);
 
router.get("/",authenticate,authorize("admin"), controller.getAll);

router.get("/:id",authenticate, authorize("admin"),controller.getById);

router.put("/:id", authenticate, validate(updateUserSchema), authorize("admin"), controller.update);

router.delete("/:id",authenticate, authorize("admin"), controller.delete);

export default router;
