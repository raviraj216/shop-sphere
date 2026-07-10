import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
    private repository = new ProductRepository();

    createProduct(data: any) {
        return this.repository.create(data);
    }

    getProducts() {
        console.log("service");

        return this.repository.findAll();
    }
}
