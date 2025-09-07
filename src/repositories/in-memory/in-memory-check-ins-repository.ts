import { CheckInsRepository } from '@/repositories/check-ins-repository'
import dayjs from 'dayjs'
import { CheckIn, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async findManyByUserId(userId: string, page: number) {
        return this.items.filter((checkIn) => checkIn.user_id === userId)
            .slice((page - 1) * 20, page * 20)
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkOnSameData = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            if (!isOnSameDate) {
                return false
            }

            return checkIn.user_id === userId
        })

        if (!checkOnSameData) {
            return null
        }

        return checkOnSameData
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }

    async countByUserId(userId: string) {
        return this.items.filter((checkIn) => checkIn.user_id === userId).length
    }

    async findById(id: string) {
        const checkIn = this.items.find((checkIn) => checkIn.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

        if (checkInIndex >= 0) {
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }
}