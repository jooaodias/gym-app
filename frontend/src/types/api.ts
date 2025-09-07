export interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'MEMBER'
    created_at: Date
}

export interface Gym {
    id: string
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

export interface CheckIn {
    id: string
    created_at: Date
    validated_at: Date | null
    user_id: string
    gym_id: string
    gym: Gym
}

export interface UserMetrics {
    checkInsCount: number
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface AuthenticateRequest {
    email: string
    password: string
}

export interface AuthenticateResponse {
    token: string
}

export interface CreateGymRequest {
    title: string
    description?: string | null
    phone?: string | null
    latitude: number
    longitude: number
}

export interface SearchGymsRequest {
    q: string
    page?: number
}

export interface SearchGymsResponse {
    gyms: Gym[]
}

export interface NearbyGymsRequest {
    latitude: number
    longitude: number
}

export interface NearbyGymsResponse {
    gyms: Gym[]
}

export interface CheckInRequest {
    latitude: number
    longitude: number
}

export interface CheckInResponse {
    checkIn: CheckIn
}

export interface CheckInHistoryRequest {
    page?: number
}

export interface CheckInHistoryResponse {
    checkIns: CheckIn[]
}

export interface ValidateCheckInRequest {
    checkInId: string
}

export interface ProfileResponse {
    user: User
}
