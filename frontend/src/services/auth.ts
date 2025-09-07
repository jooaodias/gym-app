import { api } from '@/lib/axios'
import type {
    RegisterRequest,
    AuthenticateRequest,
    AuthenticateResponse,
    User,
    ProfileResponse,
} from '@/types/api'

export const authService = {
    async register(data: RegisterRequest): Promise<void> {
        await api.post('/users', data)
    },

    async authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
        const response = await api.post('/sessions', data)
        return response.data
    },

    async getProfile(): Promise<User> {
        const response = await api.get<ProfileResponse>('/me')
        return response.data.user
    },

    async refreshToken(): Promise<AuthenticateResponse> {
        const response = await api.patch('/token/refresh')
        return response.data
    },

    logout(): void {
        localStorage.removeItem('token')
    },
}
