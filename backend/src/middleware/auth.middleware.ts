import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { verifyAccessToken } from "../utils/jwt";

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyAccessToken(token);

        req.user = {
            userId: payload.userId,
            role: payload.role,
        };

        next();
    } catch {
        next(new AppError("Invalid Token", 401));
    }
}