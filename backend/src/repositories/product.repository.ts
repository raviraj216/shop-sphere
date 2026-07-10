import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
export class ProductRepository {
    async create(data: any) {
        return Product.create(data);
    }

    async findAll() {
        console.log("repository");
        return Product.find().populate("category");
    }

    async findById(id: string) {
        return Product.findById(id).populate("category");
    }
}
