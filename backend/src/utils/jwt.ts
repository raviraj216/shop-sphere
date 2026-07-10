import jwt, { SignOptions,JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
    userId: string;
    role: string;
}

export interface RefreshTokenPayload extends JwtPayload {
    userId: string;
}

// export function generateToken(userId: string) {
//     return jwt.sign(
//         { userId },
//         process.env.JWT_SECRET!,
//         {
//             expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
//         }
//     );
// }

export function generateAccessToken(user: {
    id: string;
    role: string;
}) {
    return jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
        }
    );
}

export function generateRefreshToken(userId: string) {
    return jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET as string,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]
        }
    );
}


export function verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET!
    ) as RefreshTokenPayload;
}