import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/app-error";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        let uploadPath = "uploads";

        if (file.fieldname === "avatar") {
            uploadPath = "uploads/users";
        }

        if (file.fieldname === "images") {
            uploadPath = "uploads/products";
        }

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename(req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

const fileFilter: multer.Options["fileFilter"] = (
    req,
    file,
    cb
) => {
    const allowed = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError("Only image files are allowed", 400));
    }
};

export const upload = multer({
    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});