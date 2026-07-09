import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";
import { AuthService } from "../services/auth.service";
const authService = new AuthService();

export class AuthController {
    register = asyncHandler(async (req, res) => {
        const result = await authService.register(req.body);

        return res.status(201).json(
            ApiResponse.success(
                result,
                "User registered successfully"
            )
        );
    });

    login = asyncHandler(async (req, res) => {
        const result = await authService.login(
            req.body.email,
            req.body.password
        );

        return res.json(
            ApiResponse.success(
                result,
                "Login successful"
            )
        );
    });

    profile = asyncHandler(async (req, res) => {
        return res.json(
            ApiResponse.success(
                req.user,
                "Profile fetched successfully"
            )
        );
    });
}