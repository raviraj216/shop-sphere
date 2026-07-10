import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { upload } from "../config/multer";

const router = Router();

const controller = new ProductController();

router.post("/", upload.array("images", 5), controller.create);

router.get("/", controller.getAll);

export default router;
