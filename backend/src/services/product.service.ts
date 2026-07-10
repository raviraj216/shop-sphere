import { ProductRepository } from "../repositories/product.repository";
import { ProductQuery } from "../types/product-query";

export class ProductService {
    private repository = new ProductRepository();

    createProduct(data: any) {
        return this.repository.create(data);
    }

    update(id: string, data: any) {

        return this.repository.update(id, data);

    }
    // getProducts() {
    //     console.log("service");

    //     return this.repository.findAll();
    // }

    getProducts(query: ProductQuery) {
        return this.repository.findProducts(query);
    }

    delete(id: string) {

        return this.repository.softDelete(id);

    }

    restore(id: string) {

        return this.repository.restore(id);

    }
}
