import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
    private repository = new CategoryRepository();

    async createCategory(data: any) {
        return this.repository.create(data);
    }

    async getCategories() {
        return this.repository.findAll();
    }

    async getCategory(id: string) {
        return this.repository.findById(id);
    }

    async updateCategory(id: string, data: any) {
        return this.repository.update(id, data);
    }

    async deleteCategory(id: string) {
        return this.repository.delete(id);
    }
}
