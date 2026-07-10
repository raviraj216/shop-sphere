import { CategoryService } from "../services/category.service";

import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";

const service = new CategoryService();

export class CategoryController {
    create = asyncHandler(async (req, res) => {
        const category = await service.createCategory(req.body);
        return res.status(201).json(ApiResponse.success(category, "Category created successfully"));
    });

    getAll = asyncHandler(async (req, res) => {
        const categories = await service.getCategories();
        return res.json(ApiResponse.success(categories));
    });

    getById = asyncHandler(async (req, res) => {
        const category = await service.getCategory(req.params.id);
        return res.json(ApiResponse.success(category));
    });
    update = asyncHandler(async (req, res) => {
        const user = await service.updateCategory(req.params.id, req.body);
        return res.json(ApiResponse.success(user, "Category updated successfully"));
    });
    delete = asyncHandler(async (req, res) => {
        await service.deleteCategory(req.params.id);
        return res.send(ApiResponse.success(null, "Category deleted successfully"));
    });
}
