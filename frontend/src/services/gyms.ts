import { api } from '@/lib/axios'
import type {
    Gym,
    CreateGymRequest,
    SearchGymsRequest,
    SearchGymsResponse,
    NearbyGymsRequest,
    NearbyGymsResponse,
} from '@/types/api'

export const gymService = {
    async create(data: CreateGymRequest): Promise<void> {
        await api.post('/gyms', data)
    },

    async search({ q, page = 1 }: SearchGymsRequest): Promise<Gym[]> {
        const response = await api.get<SearchGymsResponse>('/gyms/search', {
            params: { q, page },
        })
        return response.data.gyms
    },

    async findNearby({ latitude, longitude }: NearbyGymsRequest): Promise<Gym[]> {
        const response = await api.get<NearbyGymsResponse>('/gyms/nearby', {
            params: { latitude, longitude },
        })
        return response.data.gyms
    },
}
