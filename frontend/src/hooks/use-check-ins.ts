import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { checkInService } from '@/services/check-ins'
import type { CheckInRequest, CheckInHistoryRequest } from '@/types/api'

export function useCreateCheckIn() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ gymId, data }: { gymId: string; data: CheckInRequest }) =>
            checkInService.create(gymId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['check-ins'] })
            queryClient.invalidateQueries({ queryKey: ['metrics'] })
        },
    })
}

export function useCheckInHistory(params: CheckInHistoryRequest = {}) {
    return useQuery({
        queryKey: ['check-ins', 'history', params],
        queryFn: () => checkInService.getHistory(params),
    })
}

export function useUserMetrics() {
    return useQuery({
        queryKey: ['metrics'],
        queryFn: checkInService.getMetrics,
    })
}

export function useValidateCheckIn() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: checkInService.validate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['check-ins'] })
        },
    })
}
