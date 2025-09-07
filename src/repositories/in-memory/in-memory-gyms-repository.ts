import { Gym, Prisma } from "generated/prisma";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = [];

    public async findById(gymId: string) {
        const gym = this.items.find(item => item.id === gymId);
        return gym || null;
    }

    public async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description || null,
            phone: data.phone || null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            createdAt: new Date(),
        };

        this.items.push(gym);
        return gym;
    }

    public async searchMany(query: string, page: number): Promise<Gym[]> {
        return this.items.filter(item => item.title.includes(query))
            .slice((page - 1) * 20, page * 20);
    }

    public async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() },
            )

            return distance < 10;
        });
    }

}