import { Prisma, User } from "generated/prisma";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository {
    private items: User[] = [];

    public async findById(userId: string): Promise<User | null> {
        const user = this.items.find(item => item.id === userId);
        return user || null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email);
        return user || null;
    }

    public async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.items.push(user);
        return user
    }
}