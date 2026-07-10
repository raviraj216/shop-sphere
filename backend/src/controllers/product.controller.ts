import { ProductService } from "../services/product.service";
import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";
import { AppError } from "../utils/app-error";

const service = new ProductService();

export class ProductController {
    create = asyncHandler(async (req, res) => {
        const files = req.files;
        const images = (req.files as Express.Multer.File[]).map(
            (file) => "/uploads/products/" + file.filename
        );
         
        const product = await service.createProduct({ ...req.body, images });

        return res.status(201).json(ApiResponse.success(product, "Product created successfully"));
    });


    update = asyncHandler(async (req, res) => {
        const product = await service.update(
            req.params.id,
            req.body
        );
        return res.json(
            ApiResponse.success(
                product,
                "Product updated successfully"
            )
        );
    });

    getAll = asyncHandler(async (req, res) => {

        const result = await service.getProducts(req.query as any);

        return res.json(
            ApiResponse.success(result)
        );

    });


    delete = asyncHandler(async (req, res) => {

        await service.delete(req.params.id);

        return res.json(
            ApiResponse.success(
                null,
                "Product deleted successfully"
            )
        );

    });

    restore = asyncHandler(async (req, res) => {

        const product = await service.restore(req.params.id);

        return res.json(
            ApiResponse.success(
                product,
                "Product restored successfully"
            )
        );

    });
}
