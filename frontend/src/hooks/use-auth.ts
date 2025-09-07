import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth'
import { useAuth } from '@/contexts/AuthContext'

export function useRegister() {
    return useMutation({
        mutationFn: authService.register,
    })
}

export function useProfile() {
    const { isAuthenticated } = useAuth()

    return useQuery({
        queryKey: ['profile'],
        queryFn: authService.getProfile,
        enabled: isAuthenticated,
    })
}

export function useSignOut() {
    const queryClient = useQueryClient()
    const { signOut } = useAuth()

    return useMutation({
        mutationFn: async () => {
            signOut()
        },
        onSuccess: () => {
            queryClient.clear()
        },
    })
}
