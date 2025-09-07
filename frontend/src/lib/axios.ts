import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Try to refresh token
            try {
                const response = await api.patch('/token/refresh')
                const { token } = response.data

                localStorage.setItem('token', token)

                // Retry original request
                const originalRequest = error.config
                originalRequest.headers.Authorization = `Bearer ${token}`

                return api(originalRequest)
            } catch (refreshError) {
                // Refresh failed, redirect to login
                localStorage.removeItem('token')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export { api }
