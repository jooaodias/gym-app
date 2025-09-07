import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { gymService } from '@/services/gyms'
import type { SearchGymsRequest, NearbyGymsRequest } from '@/types/api'

export function useCreateGym() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: gymService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gyms'] })
        },
    })
}

export function useSearchGyms(params: SearchGymsRequest) {
    return useQuery({
        queryKey: ['gyms', 'search', params],
        queryFn: () => gymService.search(params),
        enabled: !!params.q,
    })
}

export function useNearbyGyms(params: NearbyGymsRequest) {
    return useQuery({
        queryKey: ['gyms', 'nearby', params],
        queryFn: () => gymService.findNearby(params),
        enabled: !!(params.latitude && params.longitude),
    })
}
