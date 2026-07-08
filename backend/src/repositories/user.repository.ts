import { User } from "../models/user.model";

export class UserRepository {
    async create(data: any) {
        return await User.create(data);
    }

    async findAll() {
        return await User.find();
    }

    async findById(id: string) {
        return await User.findById(id);
    }

    async update(id: string, data: any) {
        return await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
    }

    async delete(id: string) {
        return await User.findByIdAndDelete(id);
    }
}