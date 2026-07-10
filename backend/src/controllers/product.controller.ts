import { ProductService } from "../services/product.service";
import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";

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

    getAll = asyncHandler(async (req, res) => {
        console.log("Fetching all products...");
        const products = await service.getProducts();
        console.log("products", products);

        return res.json(ApiResponse.success(products));
    });
}
