import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { validate } from "../middleware/validate";

import { createCategorySchema, updateCategorySchema } from "../validators/category.validator";
import { authorize } from "../middleware/authorize";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

const controller = new CategoryController();

router.post(
    "/",
    authenticate,
    authorize("admin"),
    validate(createCategorySchema),
    controller.create
);

router.get("/", authenticate, authorize("admin"), controller.getAll);

router.get("/:id", authenticate, authorize("admin"), controller.getById);

router.put(
    "/:id",
    authenticate,
    validate(updateCategorySchema),
    authorize("admin"),
    controller.update
);

router.delete("/:id", authenticate, authorize("admin"), controller.delete);

export default router;
