import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { upload } from "../config/multer";
import { validate } from "../middleware/validate";
import { createProductSchema } from "../validators/product.validator";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize";

const router = Router();

const controller = new ProductController();

router.post("/", upload.array("images", 5),validate(createProductSchema) , controller.create);

router.get("/", controller.getAll);



router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    controller.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    controller.delete
);

router.patch(
    "/:id/restore",
    authenticate,
    authorize("admin"),
    controller.restore
);

export default router;
