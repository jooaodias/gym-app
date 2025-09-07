import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        return user;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }


    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}