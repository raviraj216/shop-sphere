import { jwt } from "zod";
import { UserRepository } from "../repositories/user.repository";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { AppError } from "../utils/app-error";
import { User } from "../models/user.model";

export class AuthService {
    private repository = new UserRepository();

    async register(data: any) {
        const user = await this.repository.create(data);
        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
        });

        const refreshToken = generateRefreshToken(user.id);

        return { user, accessToken, refreshToken };
    }

    async login(email: string, password: string) {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }
        const valid = await user.comparePassword(password);

        if (!valid) {
            throw new AppError("Invalid email or password", 401);
        }

        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
        });

        const refreshToken = generateRefreshToken(user.id);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new AppError("Refresh token is required", 400);
        }

        const payload = verifyRefreshToken(refreshToken);

        const user = await this.repository.findById(payload.userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
        });

        return {
            accessToken,
        };
    }

    async logout() {
        return true;
    }
}
