import { Router } from "express";

import { upload } from "../config/multer";

import { UploadController } from "../controllers/upload.controller";

const router = Router();

const controller = new UploadController();

router.post("/single",upload.single("image"),controller.uploadSingle);



router.post(
    "/user",
    upload.single("avatar"),
    controller.uploadAvatar
);

router.post(
    "/product",
    upload.array("images", 5),
    controller.uploadProductImages
);

export default router;