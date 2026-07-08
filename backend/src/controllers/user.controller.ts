import { Request, Response } from "express";
import { UserService } from "../services/user.service";

import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";

const service = new UserService();

export class UserController {
    // async create(req: Request, res: Response) {
    //     const user = await service.createUser(req.body);

    //     return res.status(201).json(user);
    // }
    create = asyncHandler(async (req, res) => {
        const user = await service.createUser(req.body);
        return res.status(201).json(ApiResponse.success(user, "User created successfully"));
    });

    // async getAll(req: Request, res: Response) {
    //     const users = await service.getUsers();

    //     return res.json(users);
    // }

    getAll = asyncHandler(async (req, res) => {
        const users = await service.getUsers();
        return res.json(ApiResponse.success(users));
    });

    // async getById(req: Request, res: Response) {
    //     const user = await service.getUser(req.params.id);

    //     return res.json(user);
    // }

    getById = asyncHandler(async (req, res) => {
        const user = await service.getUser(req.params.id);
        return res.json(ApiResponse.success(user));
    });

    // async update(req: Request, res: Response) {
    //     const user = await service.updateUser(req.params.id, req.body);

    //     return res.json(user);
    // }

    update = asyncHandler(async (req, res) => {
        const user = await service.updateUser(req.params.id, req.body);
        return res.json(ApiResponse.success(user, "User updated successfully"));
    });

    // async delete(req: Request, res: Response) {
    //     await service.deleteUser(req.params.id);

    //     return res.status(204).send();
    // }

    delete = asyncHandler(async (req, res) => {
        await service.deleteUser(req.params.id);
        return res.send(ApiResponse.success(null, "User deleted successfully"));
    });
}
