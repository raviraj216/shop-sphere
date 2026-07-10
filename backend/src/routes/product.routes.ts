import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { upload } from "../config/multer";
import { validate } from "../middleware/validate";
import { createProductSchema } from "../validators/product.validator";

const router = Router();

const controller = new ProductController();

router.post("/", upload.array("images", 5),validate(createProductSchema) , controller.create);

router.get("/", controller.getAll);

export default router;
