import { Router } from "express";
import { UserController } from "../controllers/user.controller";

import { validate } from "../middleware/validate";

import { createUserSchema ,updateUserSchema} from "../validators/user.validator";
import {authorize} from "../middleware/authorize";

const router = Router();

const controller = new UserController();

router.post("/", validate(createUserSchema), controller.create);
 

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.put("/:id",validate(updateUserSchema), authorize("admin"), controller.update);

router.delete("/:id", authorize("admin"), controller.delete);

export default router;
