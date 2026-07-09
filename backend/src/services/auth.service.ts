import { jwt } from "zod";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/app-error";
import { User } from "../models/user.model";

export class AuthService {
    private repository = new UserRepository();

    async register(data: any) {
        const user = await this.repository.create(data);
        const token = generateToken(user.id);
        return { user, token };
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

        const token = generateToken(user.id);

        return {
            user,
            token
        };
    }
}
