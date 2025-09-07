import { api } from '@/lib/axios'
import type {
    CheckIn,
    CheckInRequest,
    CheckInResponse,
    CheckInHistoryRequest,
    CheckInHistoryResponse,
    UserMetrics,
    ValidateCheckInRequest,
} from '@/types/api'

export const checkInService = {
    async create(gymId: string, data: CheckInRequest): Promise<CheckIn> {
        const response = await api.post<CheckInResponse>(`/gyms/${gymId}/check-ins`, data)
        return response.data.checkIn
    },

    async getHistory({ page = 1 }: CheckInHistoryRequest = {}): Promise<CheckIn[]> {
        const response = await api.get<CheckInHistoryResponse>('/check-ins/history', {
            params: { page },
        })
        return response.data.checkIns
    },

    async getMetrics(): Promise<UserMetrics> {
        const response = await api.get<UserMetrics>('/check-ins/metrics')
        return response.data
    },

    async validate({ checkInId }: ValidateCheckInRequest): Promise<void> {
        await api.patch(`/check-ins/${checkInId}/validate`)
    },
}
