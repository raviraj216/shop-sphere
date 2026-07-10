import { Request, Response } from "express";

export class UploadController {

    uploadSingle(req: Request, res: Response) {
        return res.json({
            success: true,
            file: req.file
        });
    }

    uploadAvatar(req: Request, res: Response) {
        return res.json({
            success: true,
            file: req.file,
        });
    }

    uploadProductImages(req: Request, res: Response) {
        return res.json({
            success: true,
            files: req.files,
        });
    }
}