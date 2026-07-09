import { Router } from "express";
import { UserController } from "../controllers/user.controller";

import { validate } from "../middleware/validate";

import { createUserSchema ,updateUserSchema} from "../validators/user.validator";


const router = Router();

const controller = new UserController();

router.post("/", validate(createUserSchema), controller.create);
 

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.put("/:id",validate(updateUserSchema), controller.update);

router.delete("/:id", controller.delete);

export default router;
