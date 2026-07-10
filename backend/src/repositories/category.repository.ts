import { Category } from "../models/category.model";

export class CategoryRepository {
    async create(data: any) {
        return await Category.create(data);
    }

    async findAll() {
        return await Category.find();
    }

    async findById(id: string) {
        return await Category.findById(id);
    }

    async update(id: string, data: any) {
        return await Category.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async delete(id: string) {
        return await Category.findByIdAndDelete(id);
    }
}
