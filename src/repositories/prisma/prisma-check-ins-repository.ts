import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { CheckIn, Prisma } from "generated/prisma";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        });

        return checkIn;
    }

    async findById(checkInId: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id: checkInId,
            },
        });

        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf('day').toDate();
        const endOfDay = dayjs(date).endOf('day').toDate();

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        return checkIn;
    }

    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId,
            },
            skip: (page - 1) * 20,
            take: 20,
            orderBy: {
                created_at: 'desc',
            },
        });

        return checkIns;
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId,
            },
        });
        return count;
    }

    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id,
            },
            data: data,
        });

        return checkIn;
    }
}