import { ProductRepository } from "../repositories/product.repository";
import { ProductQuery } from "../types/product-query";
import { cacheService } from "./index";
import { CacheKeys } from "../utils/cache-key";
import { AppError } from "../utils/app-error";
import { ProductDocument } from "../models/product.model";

export class ProductService {
    private repository = new ProductRepository();

    async createProduct(data: any) {
        const product = await this.repository.create(data);
        await cacheService.clearByPattern(
            "products:*"
        );
        
        return product;
    }

    async update(id: string, data: any) {

        const product = await this.repository.update(
                id,
                data
            );
        await cacheService.delete(
            CacheKeys.product(id)
        );
        await cacheService.clearByPattern(
            "products:*"
        )
        return product;

    }
    // getProducts() {
    //     console.log("service");

    //     return this.repository.findAll();
    // }

    async getProducts(query: ProductQuery) {
        
        const cacheKey = `${CacheKeys.products}:${JSON.stringify(query)}`;
        const cached  = await cacheService.get(cacheKey);

        if (cached) {
            console.log("✅ Product Cache Hit");
            return cached;
        }
        console.log("❌ Product List Cache Miss");

        const products = await this.repository.findProducts(query);
        await cacheService.set(
            cacheKey,
            products,
            600
        );
        return products;

    }


    async getProductById(id: string) {

            const cacheKey = CacheKeys.product(id);

            const cached = await cacheService.get<ProductDocument>(
                    cacheKey
                );
            if (cached) {
                console.log("✅ Product Cache Hit");
                return cached;
            }
            console.log("❌ Product Cache Miss");
            const product = await this.repository.findById(id);

            if (!product) {
                throw new AppError(
                    "Product not found",
                    404
                );
        }

        await cacheService.set(
            cacheKey,
            product,
            600
        );
        return product;
    }

    async delete(id: string) {
        await this.repository.softDelete(id);
        await cacheService.delete(
            CacheKeys.product(id)
        );
        await cacheService.clearByPattern(
            "products:*"
        );
    }

    restore(id: string) {

        return this.repository.restore(id);

    }
}
