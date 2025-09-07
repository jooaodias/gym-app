import { prisma } from "@/lib/prisma";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { Prisma, Gym } from "generated/prisma";

export class PrismaGymsRepository implements GymsRepository {
    async findById(gymId: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id: gymId,
            },
        });

        return gym;
    }

    create(data: Prisma.GymCreateInput): Promise<Gym> {
        const createdGym = prisma.gym.create({
            data,
        });
        return createdGym;

    }

    searchMany(query: string, page: number): Promise<Gym[]> {
        const gym = prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                }

            },
            skip: (page - 1) * 20,
            take: 20,
        })

        return gym
    }

    findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Gym[]> {
        const gyms = prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE (
                6371 * acos(
                    cos(radians(${latitude})) * cos(radians(latitude)) *
                    cos(radians(longitude) - radians(${longitude})) +
                    sin(radians(${latitude})) * sin(radians(latitude))
                )
            ) <= 10
        `
        return gyms
    }
}