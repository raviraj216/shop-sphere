import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private repository = new UserRepository();

    async createUser(data: any) {
        return this.repository.create(data);
    }

    async getUsers() {
        return this.repository.findAll();
    }

    async getUser(id: string) {
        return this.repository.findById(id);
    }

    async updateUser(id: string, data: any) {
        return this.repository.update(id, data);
    }

    async deleteUser(id: string) {
        return this.repository.delete(id);
    }
}
