import jwt, { SignOptions } from "jsonwebtoken";

export function generateToken(userId: string) {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
        }
    );
}